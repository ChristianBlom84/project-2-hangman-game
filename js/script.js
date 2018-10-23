// Globala variabler
var wordList; // Lista med spelets alla ord
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden
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

    letterBoxes = document.querySelectorAll("#letterBoxes li input");

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

    msgElem = document.querySelector("#message");

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

function startGame() {

    hangmanImgNr = 0;
    var hangmanImgEl = document.querySelector("#hangman");
    hangmanImgEl.src = hangmanImg[hangmanImgNr];

    msgElem.textContent = "";
    letterButtons.addEventListener("click", buttonListener);
    selectedWord = randomWord(wordList);
    setLetterBoxes(selectedWord);
    reactivateButtons();
}

/**
 * This function chooses a random word from a preset word array.
 *
 * @param {*} wordArray
 * @returns {string} String of random index of wordArray
 */
function randomWord(wordArray) {
    debugger;
    console.log(wordArray[Math.floor(Math.random() * 10)]);
    return wordArray[Math.floor(Math.random() * 10)];
}
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
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
            letterBoxes[i].style.display = "inline-flex";
            letterBoxes[i].value = "";
        }
    } else {
        alert("Error with word generation, aborting.");
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function writeLetterBox(selectedLetter) {
    var foundLetter = false;
    var gameWon;
    var foundWord = "";

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) === selectedLetter.target.value) {
            letterBoxes[i].value = selectedLetter.target.value;
            foundLetter = true;
        } 
        
        if (letterBoxes[i].value !== "") {
            foundWord = foundWord + letterBoxes[i].value;
        }
    }

    if (foundLetter === false && hangmanImgNr < 8) {

        var hangmanImgEl = document.querySelector("#hangman");

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

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
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
    }

    letterButtons.removeEventListener("click", buttonListener);
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
// Endast aktivering/återaktivering av knapparna, inaktivering är inbakad i funktionen som körs när man klickar på en knapp
function reactivateButtons() {

    allLetterButtons = document.querySelectorAll("#letterButtons button");

    for (var i = 0; i < allLetterButtons.length; i++) {
        allLetterButtons[i].disabled = false;
    }

}