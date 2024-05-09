// Modal to bring up instructions on page load
function loadModal() {
    $('#instructions').modal('show');
}
// Score variable to keep track of the score
let score = 0;

// Instruction variable to keep track of the given instruction
let instruction;

// Variable that will store which button has been pressed
let buttonPress;

// Variable to set the initial timeout duration
let initialTimeout = 2000;

// Variable to check if the game is over
let gameOver = false;

// Variable to store the previous index for the first turn
let previousIndex = -1;

// Function to load the high score from local storage
loadHighScore();

// Function to change the background image to the Pet It background
function changeBackgroundToPetIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('./assets/images/petit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('./assets/images/default_background.png')";
    }, 1000);
}

// Event listener for the petItIcon button
document.getElementById("petItIcon").addEventListener("click", function () {
    buttonPress = 'petItIcon';
    console.log("Button Pressed: " + buttonPress);
    changeBackgroundToPetIt();
});

// Function to change the background image to the Feed It background
function changeBackgroundToFeedIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('./assets/images/feedit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('./assets/images/default_background.png')";
    }, 1000);
}

// Function for Feed It button to change the background image and store the button press
document.getElementById("feedItIcon").addEventListener("click", function () {
    buttonPress = 'feedItIcon';
    console.log("Button Pressed: " + buttonPress);
    changeBackgroundToFeedIt();
});

// Function to change the background image to the Brush It background
function changeBackgroundToBrushIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('./assets/images/brushit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('./assets/images/default_background.png')";
    }, 1000);
}

// Function for Brush It button to change the background image and store the button press
document.getElementById("brushItIcon").addEventListener("click", function () {
    buttonPress = 'brushItIcon';
    console.log("Button Pressed: " + buttonPress);
    changeBackgroundToBrushIt();
});

// Function to change the background image to the Play Time background
function changeBackgroundToPlayTime() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('./assets/images/playtime_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('./assets/images/default_background.png')";
    }, 1000);
}

// Function for Play Time button to change the background image and store the button press
document.getElementById("playTimeIcon").addEventListener("click", function () {
    buttonPress = 'playTimeIcon';
    console.log("Button Pressed: " + buttonPress);
    changeBackgroundToPlayTime();
});

// Event listener to start the game 1000ms after the play button is clicked
document.getElementById('gameStart').addEventListener('click', function () {
    setTimeout(playRandomFile, 1000);
});

// Function to randomly play one of the audio files, check which instruction has been called, reduce the timer, and check to see if the right button has been pressed
function playRandomFile() {
    i = 0;
    // Check if the game is over
    if (gameOver) {
        return;
    }

    // Start the progress bar that counts down as the time runs out
    progress();

    // Set the start time for the round
    const startTime = Date.now();

    // Choose a random instruction from the four available options
    const audioFiles = ['./assets/audio/brushit.wav', './assets/audio/petit.wav', './assets/audio/playtime.wav', './assets/audio/feedit.wav'];
    let randomIndex;
    do {
        randomIndex = getRandomIndex(audioFiles.length);
    } while (randomIndex === previousIndex);
    previousIndex = randomIndex;
    const randomAudio = audioFiles[randomIndex];
    const instruction = getInstruction(randomAudio);

    // Play the audio file
    playAudio(randomAudio);

    // Object to map the correct button to the instruction
    const correctButtons = {
        'Brush It': 'brushItIcon',
        'Pet It': 'petItIcon',
        'Play Time': 'playTimeIcon',
        'Feed It': 'feedItIcon'
    };
    const correctButtonId = correctButtons[instruction];

    // Check if the right button has been pressed and either subtract time or end the game
    setTimeout(() => {
        if (instruction && buttonPress === correctButtonId) {
            score++;
            document.getElementById('score').textContent = score;
            initialTimeout -= 10;
            const remainingTime = initialTimeout - (Date.now() - startTime);

            setTimeout(playRandomFile, remainingTime);
        } else {
            gameOver = true;
            loadLossModal();
        }
    }, initialTimeout);
}

// Function to get a random file from the audio files
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

// Function to get the instruction based on the audio file path
function getInstruction(audioFile) {
    const instructions = {
        './assets/audio/brushit.wav': 'Brush It',
        './assets/audio/petit.wav': 'Pet It',
        './assets/audio/playtime.wav': 'Play Time',
        './assets/audio/feedit.wav': 'Feed It'
    };
    return instructions[audioFile] || '';
}

// Function to play audio
function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

// Modal to bring up on loss of game
function loadLossModal() {
    $('#loss').modal('show');
    updateHighScore();
}

// Function to update the high score using local storage
function updateHighScore() {
    if (score > localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', score);
    }
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
}

// Function to load the high score from local storage
function loadHighScore() {
    if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', 0);
    }
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
}

// Function to listen for the Reset High Score button being clicked off Instructions modal, and then resetting the high score
document.getElementById('resetHighScore').addEventListener('click', function () {
    console.log("Reset High Score button clicked");
    localStorage.setItem('highScore', 0);
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
});

// Function to listen for the Reset High Score button being clicked off Loss modal, and then resetting the high score
document.getElementById('resetHighScoreLoss').addEventListener('click', function () {
    console.log("Reset High Score button clicked");
    localStorage.setItem('highScore', 0);
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
});

// Event listener for when the 'Play Again' button is clicked
document.getElementById('gameStartAgain').addEventListener('click', function () {
    resetGame();
    setTimeout(playRandomFile, 1000);
});

// Function to reset the game
function resetGame() {
    score = 0;
    gameOver = false;
    initialTimeout = 2000;
    previousIndex = -1;
    document.getElementById('score').textContent = score;
};

// Progress Bar that counts down as the time runs out
var i = 0;
function progress() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 100;
        var decreaseAmount = (100 / initialTimeout) * 10;
        var id = setInterval(frame, 10);
        function frame() {
            if (width <= 0) {
                clearInterval(id);
                i = 0;
            } else {
                width -= decreaseAmount;
                elem.style.width = width + "%";
            }
        }
    }
}