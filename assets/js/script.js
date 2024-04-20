// Modal to bring up instructions on page load
function loadModal() {
    $('#instructions').modal('show');
}
//Score variable to keep track of the score
let score = 0;

//Instruction variable to keep track of the given instruction
let instruction;

//Variable that will store which button has been pressed
let buttonPress;

// Functions for each button to change the background image and matching event listeners to store the button press
function changeBackgroundToBrushIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/brushit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("brushIt").addEventListener("click", function() {
    changeBackgroundToBrushIt();
    buttonPress = 'brushIt';
    gameButton();
    playRandomFile('brushIt');
});

function changeBackgroundToStrokeIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/strokeit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("strokeIt").addEventListener("click", function() {
    changeBackgroundToStrokeIt();
    buttonPress = 'strokeIt';
    gameButton();
    playRandomFile('strokeIt');
});


function changeBackgroundToFeedIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/feedit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("feedIt").addEventListener("click", function() {
    changeBackgroundToFeedIt();
    buttonPress = 'feedIt';
    gameButton();
    playRandomFile('feedIt');
});

function changeBackgroundToPlayTime() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/playtime_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("playTime").addEventListener("click", function() {
    changeBackgroundToPlayTime();
    buttonPress = 'playTime';
    gameButton();
    playRandomFile('playTime');
});

// Function to randomly play one of the audio files, log the instruction that's been called, and check to see if the right button has been pressed
function playRandomFile() {
    // Maths to choose a random instruction from the four available options
    const audioFiles = ['/assets/audio/brushit.wav', '/assets/audio/strokeit.wav', '/assets/audio/playtime.wav', '/assets/audio/feedit.wav'];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const randomAudio = audioFiles[randomIndex];
    
    // Switch statement to log the instruction that's been called
    switch(randomAudio) {
        case '/assets/audio/brushit.wav':
            instruction = "Brush It";
            break;
        case '/assets/audio/strokeit.wav':
            instruction = "Stroke It";
            break;
        case '/assets/audio/playtime.wav':
            instruction = "Play Time";
            break;
        case '/assets/audio/feedit.wav':
            instruction = "Feed It";
            break;
        default:
            instruction = "";
    }

    // Play the audio file
    const audio = new Audio(randomAudio);
    audio.play();
    
    // Object to map the correct button to the instruction
    var correctButtons = {
        'Brush It': 'brushIt',
        'Stroke It': 'strokeIt',
        'Play Time': 'playTime',
        'Feed It': 'feedIt'
    };
    var correctButtonId = correctButtons[instruction];

    // Timeout to check if the right button has been pressed
    setTimeout(function() {
        if (instruction && buttonPress === correctButtonId) {
            score++;
            document.getElementById('score').textContent = score;
        } else {
            loadLossModal();
        }
    }, 2000);
}

// Function to start the game 1000ms after the play button is clicked
document.getElementById('gameStart').addEventListener('click', function() {
    setTimeout(playRandomFile, 1000);
});

// Modal to bring up on loss of game
function loadLossModal() {
    $('#loss').modal('show');
}