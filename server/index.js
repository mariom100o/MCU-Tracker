// Includes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

// MCU Movie Title Schema
const titleSchema = new Schema(
    {
        number: Number, // String is shorthand for {type: String}
        title: String,
        year: String,
        runtime: Number,
        link: String,
        poster: String,
    },
    { collection: "titles" }
);
const Title = mongoose.model("Title", titleSchema);

// User Ratings Schema
const userRatingSchema = new Schema(
    {
        userId: Number,
        ratings: Object,
    },
    { collection: "userRatings" }
);
const userRating = mongoose.model("userRating", userRatingSchema);

// User Watched Status Schema
const userWatchedListSchema = new Schema(
    {
        userId: Number,
        watchedList: Array,
    },
    { collection: "userWatchedList" }
);
const userWatchedList = mongoose.model(
    "userWatchedList",
    userWatchedListSchema
);

// Allow CORS for all origins
app.use(
    cors({
        origin: "*",
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Responds with the index page - WILL REMOVE
// app.get("/", function (req, res) {
//     console.log("Got a GET request for the homepage");
//     res.sendFile(path.join(__dirname, "../index.html"));
// });

// Retrieves a list of all MCU movies/shows
app.get("/titles", function (req, res) {
    console.log(
        "Got a GET request for MCU titles from " + req.socket.remoteAddress
    );

    Title.find({})
        .sort({ number: 1 })
        .exec(function (err, docs) {
            if (err) res.send(err);
            res.json(docs);
        });
});

// Retrieves a list of all MCU movies/show ratings
app.get("/personal-ratings", function (req, res) {
    let userId = req.query.userId;
    // Remove later
    if (userId == "null") userId = "0";
    console.log(
        "Got a GET request for MCU personal ratings from %s for userId %s",
        req.socket.remoteAddress,
        userId
    );

    userRating.findOne({ userId: userId }, function (err, docs) {
        if (!docs) {
            let rating = { userId: userId, ratings: { 0: 0.0 } };
            userRating.create(rating);
            res.json({});
        } else {
            res.json(docs.ratings);
        }
    });
});

app.post("/personal-ratings", async function (req, res) {
    let userId = req.body.userId;
    let title = req.body.title;
    let rating = req.body.rating;

    // Remove later
    if (!userId) userId = "0";

    console.log(
        "Got a POST request for %d stars for title %i from user %s from %s",
        rating,
        title,
        userId,
        req.socket.remoteAddress
    );

    userRating.findOne({ userId: userId }, function (err, docs) {
        // TODO: Use SET to not have to download->clone->update->upload
        let newRatings = { ...docs.ratings };
        if (rating != 0) {
            newRatings[title] = rating;
        } else {
            delete newRatings[title];
        }

        docs.ratings = newRatings;
        docs.save();
    });

    res.sendStatus(200);
});

// Retrieves a list users watched tit;es
app.get("/status", function (req, res) {
    let userId = req.query.userId;
    // Remove later
    if (userId == "null") userId = "0";
    console.log(
        "Got a GET request for MCU watched list from %s for userId %s",
        req.socket.remoteAddress,
        userId
    );

    userWatchedList.findOne({ userId: userId }, function (err, docs) {
        if (!docs) {
            let watchedList = { userId: userId, watchedList: [] };
            userWatchedList.create(watchedList);
            res.json({});
        } else {
            res.json(docs.watchedList);
        }
    });
});

app.post("/status", async function (req, res) {
    let userId = req.body.userId;
    let title = req.body.title;
    let opt = req.body.opt;

    // Remove later
    if (!userId) userId = "0";

    console.log(
        "Got a POST request to %s title %i from user %s from %s",
        opt,
        title,
        userId,
        req.socket.remoteAddress
    );

    userWatchedList.findOne({ userId: userId }, function (err, docs) {
        // TODO: Use SET to not have to download->clone->update->upload
        let newWatchedList = [...docs.watchedList];
        if (opt == "add" && !newWatchedList.includes(title)) {
            newWatchedList.push(title);
        }
        if (opt == "remove") {
            const index = newWatchedList.indexOf(title);
            if (index > -1) {
                newWatchedList.splice(index, 1);
            }
        }
        docs.watchedList = newWatchedList;
        docs.save();
    });

    res.sendStatus(200);
});

// Start the server
let port = process.env.PORT || 3000;
var server = app.listen(port, "0.0.0.0", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("MCU Tracker Backend listening at http://%s:%s", host, port);
});
