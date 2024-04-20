// Modal to bring up instructions on page load
function loadModal() {
    $('#instructions').modal('show');
}



// Functions for each button to change the background image
function changeBackgroundToBrushIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/brushit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("brushIt").addEventListener("click", changeBackgroundToBrushIt);

function changeBackgroundToStrokeIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/strokeit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("strokeIt").addEventListener("click", changeBackgroundToStrokeIt);

function changeBackgroundToFeedIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/feedit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("feedIt").addEventListener("click", changeBackgroundToFeedIt);

function changeBackgroundToPlayTime() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/playtime_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("playTime").addEventListener("click", changeBackgroundToPlayTime);

