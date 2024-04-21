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

// Function for Brush It button to change the background image and matching event listener to store the button press
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
});

// Function for Pet It button to change the background image and matching event listener to store the button press
function changeBackgroundToPetIt() {
    var gamespace = document.getElementById("gamespace");
    gamespace.style.backgroundImage = "url('/assets/images/petit_background.png')";
    setTimeout(function() {
        gamespace.style.backgroundImage = "url('/assets/images/default_background.png')";
    }, 1000);
}
document.getElementById("petIt").addEventListener("click", function() {
    changeBackgroundToPetIt();
    buttonPress = 'petIt';
});

// Function for Feed It button to change the background image and matching event listener to store the button press
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
});

// Function for Play Time button to change the background image and matching event listener to store the button press
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
});

// Event listener to start the game 1000ms after the play button is clicked
document.getElementById('gameStart').addEventListener('click', function() {
    setTimeout(playRandomFile, 1000);
});

// Function to randomly play one of the audio files, log the instruction that's been called, and check to see if the right button has been pressed
function playRandomFile() {
    
    // Check if the game is over
    if (gameOver) {
        return;
    }

    // Start the progress bar that counts down as the time runs out
    progress();
    
    // Maths to choose a random instruction from the four available options
    const audioFiles = ['/assets/audio/brushit.wav', '/assets/audio/petit.wav', '/assets/audio/playtime.wav', '/assets/audio/feedit.wav'];
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * audioFiles.length);
    } while (randomIndex === previousIndex);
    previousIndex = randomIndex;
    const randomAudio = audioFiles[randomIndex];
    
    // Switch statement to log the instruction that's been called
    switch(randomAudio) {
        case '/assets/audio/brushit.wav':
            instruction = "Brush It";
            break;
        case '/assets/audio/petit.wav':
            instruction = "Pet It";
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
        'Pet It': 'petIt',
        'Play Time': 'playTime',
        'Feed It': 'feedIt'
    };
    var correctButtonId = correctButtons[instruction];

    // Timeout to check if the right button has been pressed
    setTimeout(function() {
        if (instruction && buttonPress === correctButtonId) {
            score++;
            document.getElementById('score').textContent = score;
            initialTimeout -= 10;
        } else {
            gameOver = true;
            loadLossModal();
        }
        if (!gameOver) {
            setTimeout(playRandomFile, initialTimeout);
        }
    }, initialTimeout);
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
document.getElementById('resetHighScore').addEventListener('click', function() {
    console.log("Reset High Score button clicked");
    localStorage.setItem('highScore', 0);
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
});

// Function to listen for the Reset High Score button being clicked off Loss modal, and then resetting the high score
document.getElementById('resetHighScoreLoss').addEventListener('click', function() {
    console.log("Reset High Score button clicked");
    localStorage.setItem('highScore', 0);
    document.getElementById('highScore').textContent = localStorage.getItem('highScore');
});

// Event listener for when the 'Play Again' button is clicked
document.getElementById('gameStartAgain').addEventListener('click', function() {
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