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

/**
 * Function is run at window.onload. The global variables are initialized and the startGame function is tied
 * to the startButton. The listener for the letterButtons is initialized once the startGame button is pressed.
 *
 */
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
        if (e.target.matches("button")) {
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
    hangmanImgEl = document.querySelector("#hangman");

    msgElem = document.querySelector("#message");

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

/**
 * This function starts the game when the startGameBtn is pressed. It resets the hangmanImg and shows
 * the background div for the timer and letterBoxes on screens smaller than 400px. It also resets the msgElem text
 * and adds an eventlistener for the ul of the letterButtons. The function buttonListener checks that the click
 * target is a button, so it doesn't catch clicks outside the buttons but inside the ul. The word is selected from
 * the wordList, which shows the correct amount of letterBoxes with setLetterBoxes(). The letterButtons are reactivated
 * and the timer interval is cleared. Finally the timer is started.
 */
function startGame() {

    hangmanImgNr = 0;
    hangmanImgEl.src = hangmanImg[hangmanImgNr];
    let backgroundTopEl = document.querySelector("#backgroundTop");
    backgroundTopEl.style.display = "block";
    backgroundTopEl.style.height = "30%";

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
            letterBoxes[i].style.marginRight = "";
            if (i == (word.length -1)) {
                letterBoxes[i].style.marginRight = "auto";
            }
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
    let frogElWin = document.querySelector("#frogWin");
    let frogElLoss = document.querySelector("#frogLoss");
    /**
     * frog() takes the HTML Element of the #frogWin or #frogLoss divs as a parameter to show the appropriate one at game end
     * and adds an eventlistener to remove them onclick.
     * 
     * @param {HTMLElement} frogState
     */
    function frog(frogState) {
        frogState.style.display = "block";
        frogState.addEventListener("click", removeFrog);
        function removeFrog () {
            frogState.style.display = "none";
            frogState.removeEventListener("click", removeFrog);
        }
    }

    if (state === "win") {
        msgElem.textContent = ("Congratulations, you win!");
        frog(frogElWin);
    } else if (state === "lose") {
        msgElem.textContent = ("Too bad, you lost! Try again.");
        frog(frogElLoss);
    } else if (state === "timeup") {
        msgElem.textContent = ("Time\'s up, you lost! Try again.");
        frog(frogElLoss);
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
        minutes: 05,
        seconds: 00
    };

    timerInterval = setInterval(function() {
        if (currentTime.seconds > 0) {
            currentTime.seconds--;
        } else if (currentTime.seconds === 0) {
            currentTime.seconds = 59;
            currentTime.minutes--;
        }

        if (currentTime.seconds <= 9) {
            timerEl.textContent = "0" + currentTime.minutes + ":0" + currentTime.seconds;
        } else {
            timerEl.textContent = "0" + currentTime.minutes + ":" + currentTime.seconds;

        }
        
        if (currentTime.minutes === 0 && currentTime.seconds === 0) {
            gameEnd("timeup");
        }
            

    }, 1000);
}