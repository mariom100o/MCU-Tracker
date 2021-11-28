let ratings = {};
let userId = "1";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
userId = urlParams.get("userId");

function getPersonalRatings(id) {
    fetch("http://127.0.0.1:3000/personal-ratings?userId=" + id)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            ratings = json;
            for (let i = 1; i <= Object.keys(json).length; i++) {
                fillStar(i, ratings[i]);
            }

            // Get the number of titles
            count =
                document.getElementById("title-table-body").childElementCount;

            // Set zeroes for non-rated titles
            for (let i = Object.keys(json).length; i <= count; i++) {
                ratings[i] = 0;
                fillStar(i, 0);
            }
        });
}

// Function that sets the title's rating
function setRating(title, val) {
    // Don't update if the rating is the same
    if (ratings[title] == val) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/personal-ratings", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    };
    let data = { userId: userId, title: title, rating: val };
    xhr.send(JSON.stringify(data));
    ratings[title] = val;
}

// Fills stars on title
function fillStar(title, val) {
    for (let i = 1; i <= 5; i++) {
        if (val < i - 0.5) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fa fa-star-o";
        }
        if (val >= i - 0.5) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fa fa-star-half-o";
        }
        if (val >= i) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fa fa-star checked";
        }
    }
}

function starEvent(count) {
    getPersonalRatings(userId);
    for (let i = 1; i <= count; i++) {
        for (let j = 1; j <= 5; j++) {
            // Fill half/full star when hovering
            $(
                document.getElementById(
                    "star" + i.toString() + "-" + j.toString()
                )
            ).mousemove(function (e) {
                var pWidth = $(this).innerWidth();
                var pOffset = $(this).offset();
                var x = e.pageX - pOffset.left;
                if (pWidth / 2 > x) {
                    fillStar(i, j - 0.5);
                } else {
                    fillStar(i, j);
                }
            });
            // Set rating on click
            $(
                document.getElementById(
                    "star" + i.toString() + "-" + j.toString()
                )
            ).mouseup(function (e) {
                var pWidth = $(this).innerWidth();
                var pOffset = $(this).offset();
                var x = e.pageX - pOffset.left;
                if (pWidth / 2 > x) {
                    setRating(i, j - 0.5);
                } else {
                    setRating(i, j);
                }
            });
        }
        // Reset stars to set rating when no longer hovering in the star div
        $(document.getElementById("star-div-" + i.toString())).mouseleave(
            function (e) {
                fillStar(i, ratings[i]);
            }
        );
    }
}
