// Globala variabler
var wordList; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var hangmanImgEl; // Element for the hangmanImg
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var timerInterval; // Intervall för timern
var buttonListener; // Lagrar funktion för att hantera klick på bokstäver. Global för att kunna ta bort eventListener när spelet är över.

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.

function init() {

    wordList = [
        "CHAS",
        "ACADEMY",
        "HTML",
        "JAVASCRIPT",
        "BOOTSTRAP",
        "FOUNDATION",
        "BOILERPLATE",
        "ANGULAR",
        "REACT",
        "FIREFOX"
    ];

    startGameBtn = document.querySelector("#startGameBtn");

    startGameBtn.addEventListener("click", startGame);

    letterBoxes = document.querySelectorAll("#letterBoxes li");

    letterButtons = document.querySelector("#letterButtons");

    buttonListener = function(e) {
        if (e.target !== e.currentTarget) {
            writeLetterBox(e);
        }
    
        e.stopPropagation();
    }

    hangmanImg = [
        "images/h0.png",
        "images/h1.png",
        "images/h2.png",
        "images/h3.png",
        "images/h4.png",
        "images/h5.png",
        "images/h6.png",
        "images/h7.png",
        "images/h8.png"
    ];

    hangmanImgNr = 0;
    hangmanImgEl = document.querySelector("#hangman");

    msgElem = document.querySelector("#message");

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {

    hangmanImgNr = 0;
    hangmanImgEl.src = hangmanImg[hangmanImgNr];

    msgElem.textContent = "";
    letterButtons.addEventListener("click", buttonListener);
    selectedWord = randomWord(wordList);
    setLetterBoxes(selectedWord);
    reactivateButtons();
    clearInterval(timerInterval);
    timer();
}

/**
 * This function chooses a random word from a preset word array.
 *
 * @param {string[]} wordArray
 * @returns {string} String of random index of wordArray
 */
function randomWord(wordArray) {
    console.log(wordArray[Math.floor(Math.random() * 10)]);
    return wordArray[Math.floor(Math.random() * 10)];
}
 
/**
 * Shows the correct amount of letterBoxes based on the length of word
 *
 * @param {string} word
 */
function setLetterBoxes(word) {
    if (typeof word == "string") {
        for (var i = 0; i < 11; i++) {
            letterBoxes[i].style.display = "none";
        }

        for (var i = 0; i < word.length; i++) {
            letterBoxes[i].style.display = "block";
            letterBoxes[i].firstChild.value = "";
        }
    } else {
        alert("Error during word generation, aborting.");
    }
}

/**
 * Checks if the letter on the pressed button is part of the selectedWord or not, 
 * then adds the letter to the correct boxes. The first loop is also to fill foundWord,
 * which is later checked against the length of selectedWord to determine if the game is won
 * or not. If the pressed letter isn't part of the word, the hangManImgNr is incremented by one and changed.
 * Finally the pressed button is disabled and if the foundWord is the same length as the selectedWord,
 * gameEnd("win") is called which ends the game with a win.
 *
 * @param {string} selectedLetter
 */
function writeLetterBox(selectedLetter) {
    var foundLetter = false;
    var foundWord = "";

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) === selectedLetter.target.value) {
            letterBoxes[i].firstChild.value = selectedLetter.target.value;
            foundLetter = true;
        } 
        
        if (letterBoxes[i].firstChild.value !== "") {
            foundWord = foundWord + letterBoxes[i].firstChild.value;
        }
    }

    if (foundLetter === false && hangmanImgNr < 8) {

        hangmanImgNr++;
        hangmanImgEl.src = hangmanImg[hangmanImgNr];

        if (hangmanImgNr >= 8) {
            gameEnd("lose");
        }

    }

    selectedLetter.target.disabled = true;

    if (foundWord.length === selectedWord.length) {
        gameEnd("win");
    }
    
}

/**
 * Function is called with string "win", "lose" or "timeup" and ends the game appropriately. Removes the eventListener 
 * from the letterButtons and ends the timer's setInterval regardless of state.
 *
 * @param {string} state
 */
function gameEnd(state) {
    if (state === "win") {
        msgElem.textContent = ("Congratulations, you win!");
        
        var frogEl = document.querySelector("#frogWin");
        frogEl.style.display = "block";

        function removeFrog () {
            frogEl.style.display = "none";
            frogEl.removeEventListener("click", removeFrog);
        }
        frogEl.addEventListener("click", removeFrog);

    } else if (state === "lose") {
        msgElem.textContent = ("Too bad, you lost! Try again.");
    } else if (state === "timeup") {
        msgElem.textContent = ("Time\'s up, you lost! Try again.");
    }

    letterButtons.removeEventListener("click", buttonListener);
    clearInterval(timerInterval);
}

/**
 * Function to reactivate all the letterButtons. Called when game starts.
 */
function reactivateButtons() {

    allLetterButtons = document.querySelectorAll("#letterButtons button");

    for (var i = 0; i < allLetterButtons.length; i++) {
        allLetterButtons[i].disabled = false;
    }

}

/**
 * Function to activate and start timer.
 */
function timer () {
    const timerEl = document.querySelector("#timer");
    let currentTime = {
        minutes: 00,
        seconds: 00
    };

    timerInterval = setInterval(function() {
        if (currentTime.seconds < 59) {
            currentTime.seconds++;
        } else if (currentTime.seconds === 59) {
            currentTime.seconds = 0;
            currentTime.minutes++;
        }

        if (currentTime.seconds <= 9) {
            timerEl.textContent = "0" + currentTime.minutes + ":0" + currentTime.seconds;
        } else {
            timerEl.textContent = "0" + currentTime.minutes + ":" + currentTime.seconds;

        }
        
        if (currentTime.minutes === 5) {
            gameEnd("timeup");
        }
            

    }, 1000);
    

}