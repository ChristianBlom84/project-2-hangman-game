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

    selectedWord = randomWord(wordList);

    startGameBtn = document.querySelector("#startGameBtn");

    startGameBtn.addEventListener("click", startGame);

    letterBoxes = document.querySelectorAll("#letterBoxes li");

    letterButtons = document.querySelectorAll("#letterButtons button");

    for (i = 0; i < letterButtons.length; i++) {
        selectedLetter = letterButtons[i].value;
        letterButtons[i].addEventListener("click", function(){writeLetterBox((selectedLetter))} );
        console.log(selectedLetter);
    }

    console.log(selectedWord);

    console.log(letterBoxes[2].firstElementChild.value);

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
    init();
    setLetterBoxes(selectedWord);
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
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function writeLetterBox(selectedLetter) {
    console.log(selectedLetter);
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på