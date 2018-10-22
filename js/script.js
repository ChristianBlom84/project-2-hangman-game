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

    // selectedWord = randomWord(wordList);

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
        "images/h6.png"
    ];

    hangmanImgNr = 0;

    msgElem = document.querySelector("#message");

    console.log(selectedWord);

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {

    hangmanImgNr = 0;
    var hangmanImgEl = document.querySelector("#hangman");
    hangmanImgEl.src = hangmanImg[hangmanImgNr];

    msgElem.innerHTML = "";
    letterButtons.addEventListener("click", buttonListener);
    selectedWord = randomWord(wordList);
    setLetterBoxes(selectedWord);
    reactivateButtons();
}

// Funktion som slumpar fram ett ord
function randomWord(wordArray) {
    return wordArray[Math.floor(Math.random() * 10)];
}
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
function setLetterBoxes(word) {
    for (var i = 0; i < 11; i++) {
        letterBoxes[i].style.display = "none";
    }

    for (var i = 0; i < word.length; i++) {
        letterBoxes[i].style.display = "inline-flex";
        letterBoxes[i].value = "";
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function writeLetterBox(selectedLetter) {
    // debugger;
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

    if (foundLetter === false && hangmanImgNr < 6) {

        var hangmanImgEl = document.querySelector("#hangman");

        hangmanImgNr++;
        hangmanImgEl.src = hangmanImg[hangmanImgNr];

        if (hangmanImgNr >= 6) {
            gameEnd("lose");
        }

    }

    selectedLetter.target.disabled = true;

    if (foundWord.length === selectedWord.length) {
        gameEnd("win");
    }
    
    console.log(selectedLetter.target.value);
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det
function gameEnd(state) {
    if (state === "win") {
        // debugger;
        msgElem.innerHTML = ("Congratulations, you win!");
        
        var frogEl = document.querySelector("#frogWin");
        frogEl.style.display = "block";

        function removeFrog () {
            frogEl.style.display = "none";
            frogEl.removeEventListener("click", removeFrog);
        }
        frogEl.addEventListener("click", removeFrog);

    } else if (state === "lose") {
        msgElem.innerHTML = ("Too bad, you lost! Try again.");
    }

    letterButtons.removeEventListener("click", buttonListener);
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function reactivateButtons() {

    allLetterButtons = document.querySelectorAll("#letterButtons button");

    console.log(allLetterButtons);

    for (var i = 0; i < allLetterButtons.length; i++) {
        allLetterButtons[i].disabled = false;
    }

}