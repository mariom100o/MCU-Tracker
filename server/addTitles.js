// Includes
const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

// ADD THE MOVIES HERE
let moviesToAdd = [
    {
        number: 1,
        title: "Captain America: The First Avenger",
        year: "1942-43",
        runtime: 124,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_The_First_Avenger",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/81/CaptainAmericaTheFirstAvengerComicConPoster.jpg",
    },
    {
        number: 2,
        title: "Captain Marvel",
        year: "1995",
        runtime: 124,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Captain_Marvel_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4e/CaptainMarvelPoster.jpg",
    },
    {
        number: 3,
        title: "Iron Man",
        year: "2010",
        runtime: 126,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1e/Iron_Man_Official_Poster.jpg",
    },
    {
        number: 4,
        title: "Iron Man 2",
        year: "2011",
        runtime: 125,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_2",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/cb/Iron_Man_2_Official_Poster.jpg",
    },
    {
        number: 5,
        title: "The Incredible Hulk",
        year: "2011",
        runtime: 112,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/The_Incredible_Hulk",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1b/The_Incredible_Hulk.jpg",
    },
    {
        number: 6,
        title: "Thor",
        year: "2011",
        runtime: 114,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Thor_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/5a/Thor_Official_Poster.jpg",
    },
    {
        number: 7,
        title: "The Avengers",
        year: "2012",
        runtime: 143,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/The_Avengers",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d0/Theavengersnewposter.jpg",
    },
    {
        number: 8,
        title: "Iron Man 3",
        year: "2012",
        runtime: 130,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Iron_Man_3",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/55/Iron_Man_3_IMAX_poster.jpg",
    },
    {
        number: 9,
        title: "Thor: The Dark World",
        year: "2013",
        runtime: 112,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Thor:_The_Dark_World",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/fc/Thor-_The_Dark_World_poster.jpg",
    },
    {
        number: 10,
        title: "Captain America: The Winter Soldier",
        year: "2014",
        runtime: 136,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_The_Winter_Soldier",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c0/Captain_America_The_Winter_Soldier_main_poster.jpg",
    },
    {
        number: 11,
        title: "Guardians of the Galaxy",
        year: "2014",
        runtime: 122,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Guardians_of_the_Galaxy_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/f8/GuardiansoftheGalaxyTheatricalPoster.jpg",
    },
    {
        number: 12,
        title: "Guardians of the Galaxy 2",
        year: "2014",
        runtime: 137,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Guardians_of_the_Galaxy_Vol._2",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/5c/GOTG2_Payoff_1_Sheet_Online_lg.jpg",
    },
    {
        number: 13,
        title: "Avengers: Age of Ultron",
        year: "2015",
        runtime: 141,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Age_of_Ultron",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/c/c7/Avengers_Age_Of_Ultron-poster1.jpg",
    },
    {
        number: 14,
        title: "Ant-Man",
        year: "2015",
        runtime: 117,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Ant-Man_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/bb/Ant-Man_Poster.png",
    },
    {
        number: 15,
        title: "Captain America: Civil War",
        year: "2016",
        runtime: 147,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Captain_America:_Civil_War",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/5c/Civil_War_Final_Poster.jpg",
    },
    {
        number: 16,
        title: "Spider-Man: Homecoming",
        year: "2016",
        runtime: 133,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_Homecoming",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2b/Spider_Man_Homecoming_One_Sheet_1.jpg",
    },
    {
        number: 17,
        title: "Doctor Strange",
        year: "2016-17",
        runtime: 115,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Doctor_Strange_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8b/DrStrangePoster2.jpg",
    },
    {
        number: 18,
        title: "Black Widow",
        year: "2017",
        runtime: 134,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Black_Widow_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/6f/Black_Widow_July_9_Poster.png",
    },
    {
        number: 19,
        title: "Black Panther",
        year: "2017",
        runtime: 134,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Black_Panther_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/fa/Black_Panther_Poster_October_2017.jpg",
    },
    {
        number: 20,
        title: "Thor: Ragnarok",
        year: "2017",
        runtime: 130,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Thor:_Ragnarok",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/fa/Thor_Ragnarok_SDCC_Poster.jpg",
    },
    {
        number: 21,
        title: "Ant-Man and the Wasp",
        year: "2017",
        runtime: 118,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Ant-Man_and_the_Wasp",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/0/0d/Ant-Man_and_the_Wasp_Complete_Poster.jpg",
    },
    {
        number: 22,
        title: "Avengers: Infinity War",
        year: "2017",
        runtime: 149,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Infinity_War",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/11/Avengers_Infinity_war_poster.jpeg",
    },
    {
        number: 23,
        title: "Avengers: Endgame",
        year: "2018-23",
        runtime: 181,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Avengers:_Endgame",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/91/Endgame_Poster_2.jpg",
    },
    {
        number: 24,
        title: "Loki S1",
        year: "????",
        runtime: 246,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Loki_(TV_series)/Season_One",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/22/Loki_Final_Disney%2B_Poster.jpg",
    },
    {
        number: 25,
        title: "WandaVision S1",
        year: "2023",
        runtime: 270,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/WandaVision/Season_One",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/9e/WandaVision_Poster_3.jpg",
    },
    {
        number: 26,
        title: "Shang-Chi and The Legend of the Ten Rings",
        year: "2023-24",
        runtime: 132,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Shang-Chi_and_the_Legend_of_the_Ten_Rings",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/85/Shang-Chi_theatrical_poster.jpg",
    },
    {
        number: 27,
        title: "Falcon and the Winter Soldier S1",
        year: "2023-24",
        runtime: 265,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/The_Falcon_and_The_Winter_Soldier/Season_One",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/ff/TF%26TWS_Final_Poster.jpg",
    },
    {
        number: 28,
        title: "Spider-Man: Far From Home",
        year: "2024",
        runtime: 129,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Spider-Man:_Far_From_Home",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/Official_FFH_US_Poster.jpg",
    },
    {
        number: 29,
        title: "Eternals",
        year: "2024",
        runtime: 157,
        link: "https://marvelcinematicuniverse.fandom.com/wiki/Eternals_(film)",
        poster: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/5e/EternalsPoster.jpeg",
    },
];

// MCU Movie Title Schema
const titleSchema = new Schema(
    {
        number: Number,
        title: String,
        year: String,
        runtime: String,
        link: String,
        poster: String,
    },
    { collection: "titles" }
);
const Title = mongoose.model("Title", titleSchema);
7;
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");

    for (let i = moviesToAdd.length - 1; i >= 0; i--) {
        Title.create(moviesToAdd[i]);
    }

    // db.close();
});
