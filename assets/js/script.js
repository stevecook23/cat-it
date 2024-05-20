// GLOBAL VARIABLES
/** 
 * Score variable to keep track of the score
 */
let score = 0;

/** 
 * Variable that will store which button has been pressed
 */
let buttonPress;

/** 
 * Variable to set the initial timeout duration
 */
let initialTimeout = 2000;

/** 
 * Variable to check if the game is over
 */
let gameOver = false;

/** 
 * Variable to store the previous index for the first turn
 */
let previousIndex = -1;

/** 
 * Variable to store the index for the progress bar
 */
let i = 0;

/** 
 * Variable to store initial background image
 */ 
let gamespace = document.getElementById("gamespace");

// EVENT LISTENERS
/**
 * Initializes the game by adding event listeners to the buttons
 */
function initializeGame() {
    document.getElementById("petItIcon").addEventListener("click", onPetItIconClick);
    document.getElementById("feedItIcon").addEventListener("click", onFeedItIconClick);
    document.getElementById("brushItIcon").addEventListener("click", onBrushItIconClick);
    document.getElementById("playTimeIcon").addEventListener("click", onPlayTimeIconClick);
    document.getElementById('gameStart').addEventListener('click', startGame);
    document.getElementById('gameStartAgain').addEventListener('click', resetGame);
    document.getElementById('resetHighScore').addEventListener('click', highScoreReset);
    document.getElementById('resetHighScoreLoss').addEventListener('click', highScoreReset);
    loadHighScore();
    $('#loss').on('show.bs.modal', onLossModalDisplay);
}
    
function onLossModalDisplay() {
    document.getElementById("gamescore").innerHTML = "Your score: " + score;
    document.getElementById("gamehighscore").innerHTML = "High score: " + localStorage.getItem('highScore');
}

/**
 * Modal to bring up instructions on page load
 */
function loadModal() {
    $('#instructions').modal('show');
}

/**
 * Function to start the game 1000ms after the play button is clicked
 */
function startGame() {
    setTimeout(playRandomFile, 1000);
}

/**
 * Function to handle Pet It button click
 */
function onPetItIconClick() {
    buttonPress = 'petItIcon';
    changeBackgroundToPetIt();
}

/**
 * Function to handle Feed It button click
 */
function onFeedItIconClick() {
    buttonPress = 'feedItIcon';
    changeBackgroundToFeedIt();
}

/**
 * Function to handle Brush It button click
 */
function onBrushItIconClick() {
    buttonPress = 'brushItIcon';
    changeBackgroundToBrushIt();
}

/**
 * Function to handle Play Time button click
 */
function onPlayTimeIconClick() {
    buttonPress = 'playTimeIcon';
    changeBackgroundToPlayTime();
}

/**
 * Function to change the background image to the Pet It background and back again
 */
function changeBackgroundToPetIt() {
    gamespace.style.backgroundImage = "url('assets/images/petit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('assets/images/default_background.png')";
    }, 1000);
}

/**
 * Function to change the background image to the Feed It background and back again
 */
function changeBackgroundToFeedIt() {
    gamespace.style.backgroundImage = "url('assets/images/feedit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('assets/images/default_background.png')";
    }, 1000);
}

/**
 * Function to change the background image to the Brush It background and back again
 */

function changeBackgroundToBrushIt() {
    gamespace.style.backgroundImage = "url('assets/images/brushit_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('assets/images/default_background.png')";
    }, 1000);
}

/**
 * Function to change the background image to the Play Time background and back again
 */
function changeBackgroundToPlayTime() {
    gamespace.style.backgroundImage = "url('assets/images/playtime_background.png')";
    setTimeout(function () {
        gamespace.style.backgroundImage = "url('assets/images/default_background.png')";
    }, 1000);
}

/**
 * Function to randomly play one of the audio files;
 * Also checks which instruction has been called;
 * Reduces the timer;
 * Checks to see if the right button has been pressed.
 */
function playRandomFile() {
    i = 0;
    // Check if the game is over
    if (gameOver) {
        return;
    }

    // Start the progress bar that counts down as the time runs out
    progress();

    // Set the start time for the round
    const START_TIME = Date.now();

    // Choose a random instruction from the four available options
    const AUDIO_FILES = ['assets/audio/brushit.wav', 'assets/audio/petit.wav', 'assets/audio/playtime.wav', 'assets/audio/feedit.wav'];
    let randomIndex;
    do {
        randomIndex = getRandomIndex(AUDIO_FILES.length);
    } while (randomIndex === previousIndex);
    previousIndex = randomIndex;
    const RANDOM_AUDIO = AUDIO_FILES[randomIndex];
    const INSTRUCTION = getInstruction(RANDOM_AUDIO);

    // Play the audio file
    playAudio(RANDOM_AUDIO);

    // Object to map the correct button to the instruction
    const CORRECT_BUTTONS = {
        'Brush It': 'brushItIcon',
        'Pet It': 'petItIcon',
        'Play Time': 'playTimeIcon',
        'Feed It': 'feedItIcon'
    };
    const CORRECT_BUTTON_ID = CORRECT_BUTTONS[INSTRUCTION];

    // Check if the correct button has been pressed and either subtract time or end the game
    setTimeout(() => {
        if (INSTRUCTION && buttonPress === CORRECT_BUTTON_ID) {
            score++;
            document.getElementById('score').textContent = score;
            initialTimeout -= 10;
            const REMAINING_TIME = initialTimeout - (Date.now() - START_TIME);

            setTimeout(playRandomFile, REMAINING_TIME);
        } else {
            gameOver = true;
            loadLossModal();
        }
    }, initialTimeout);
}

/**
 * Function to get a random file from the audio files
 */
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Function to get the correct instruction based on which audio file was played
 */
function getInstruction(audioFile) {
    const INSTRUCTIONS = {
        'assets/audio/brushit.wav': 'Brush It',
        'assets/audio/petit.wav': 'Pet It',
        'assets/audio/playtime.wav': 'Play Time',
        'assets/audio/feedit.wav': 'Feed It'
    };
    return INSTRUCTIONS[audioFile] || '';
}

/**
 * Function to play the randomly selected audio
 */
function playAudio(audioFile) {
    const AUDIO = new Audio(audioFile);
    AUDIO.play();
}

/**
 * Modal to bring up on loss of game
 */
function loadLossModal() {
    updateHighScore();
    onLossModalDisplay();
    $('#loss').modal('show');
}

/**
 * Function to update the high score using local storage
 */
function updateHighScore() {
    if (score > localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', score);
    }
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
}

/**
 * Function to load the high score from local storage
 */
function loadHighScore() {
    if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', 0);
    }
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
}

/**
 * Function to reset the high score
 */
function highScoreReset() {
    localStorage.setItem('highScore', 0);
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
}

/**
 * Function to reset the game
 */
function resetGame() {
    score = 0;
    gameOver = false;
    initialTimeout = 2000;
    previousIndex = -1;
    document.getElementById('score').textContent = score;
    buttonPress = '';
    startGame();
}

/**
 * Progress Bar that counts down as the time runs out
 * Variables not added to the top of this document for clarity
 */
function progress() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 100;
        var decreaseAmount = 100 / (initialTimeout / 16.67);

        function updateProgress() {
            if (width <= 0) {
                i = 0;
            } else {
                width -= decreaseAmount;
                elem.style.width = width + "%";
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }
}

document.addEventListener("DOMContentLoaded", initializeGame);