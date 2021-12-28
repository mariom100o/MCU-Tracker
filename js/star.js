let ratings = {};
let userId = "0";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
userId = urlParams.get("userId");

function getPersonalRatings(id) {
    // Set all ratings to zero to start
    count = document.getElementById("title-table-body").childElementCount;
    for (var i = 1; i <= count; i++) ratings[i] = 0;

    fetch("https://mcu-trackr.herokuapp.com/personal-ratings?userId=" + id)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            ratings = { ...ratings, ...json };
            for (let i = 1; i <= count; i++) {
                fillStar(i, ratings[i]);
            }
        });
}

// Function that sets the title's rating
function setRating(title, val) {
    // Don't update if the rating is the same
    if (ratings[title] == val) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://mcu-trackr.herokuapp.com/personal-ratings", true);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            ratings[title] = val;
            fillStar(title, val);
        }
    };
    let data = { userId: userId, title: title, rating: val };
    xhr.send(JSON.stringify(data));
}

// Fills stars on title
function fillStar(title, val) {
    for (let i = 1; i <= 5; i++) {
        if (val < i - 0.5) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fas fa-star";
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).style = "color: rgb(195, 195, 195);";
        }
        if (val >= i - 0.5) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fad fa-star-half";
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).style =
                "--fa-primary-color: orange; --fa-secondary-color: dimgray;";
        }
        if (val >= i) {
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).className = "fas fa-star";
            document.getElementById(
                "star" + title.toString() + "-" + i.toString()
            ).style = "color: orange;";
        }
    }
}

function starEvent(count) {
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

// Function that sets the title's rating
function modalSetRating(title, val) {
    // Don't update if the rating is the same
    if (ratings[title] == val) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://mcu-trackr.herokuapp.com/personal-ratings", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            fillStar(title, val);
        }
    };
    let data = { userId: userId, title: title, rating: val };
    xhr.send(JSON.stringify(data));
}

// Fills stars on title
function modalFillStar(val) {
    for (let i = 1; i <= 5; i++) {
        if (val < i - 0.5) {
            document.getElementById("modal-star" + i.toString()).className =
                "fas fa-star fa-3x";
            document.getElementById("modal-star" + i.toString()).style =
                "color: rgb(195, 195, 195);";
        }
        if (val >= i - 0.5) {
            document.getElementById("modal-star" + i.toString()).className =
                "fad fa-star-half fa-3x";
            document.getElementById("modal-star" + i.toString()).style =
                "--fa-primary-color: orange; --fa-secondary-color: dimgray;";
        }
        if (val >= i) {
            document.getElementById("modal-star" + i.toString()).className =
                "fas fa-star fa-3x";
            document.getElementById("modal-star" + i.toString()).style =
                "color: orange;";
        }
    }
}

function modalStarEvent(title) {
    modalFillStar(ratings[title]);
    for (let i = 1; i <= 5; i++) {
        // Fill half/full star when hovering
        $(document.getElementById("modal-star" + i.toString())).mousemove(
            function (e) {
                var pWidth = $(this).innerWidth();
                var pOffset = $(this).offset();
                var x = e.pageX - pOffset.left;
                if (pWidth / 2 > x) {
                    modalFillStar(i - 0.5);
                } else {
                    modalFillStar(i);
                }
            }
        );
        // Set rating on click
        $(document.getElementById("modal-star" + i.toString())).mouseup(
            function (e) {
                var pWidth = $(this).innerWidth();
                var pOffset = $(this).offset();
                var x = e.pageX - pOffset.left;
                if (pWidth / 2 > x) {
                    setRating(title, i - 0.5);
                } else {
                    setRating(title, i);
                }
            }
        );
    }
    // Reset stars to set rating when no longer hovering in the star div
    $(document.getElementById("starDiv")).mouseleave(function (e) {
        modalFillStar(ratings[title]);
    });
}
