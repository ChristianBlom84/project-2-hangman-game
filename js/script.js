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

    letterBoxes = document.querySelectorAll("#letterBoxes li input");

    letterButtons = document.querySelectorAll("#letterButtons button");

    // var letterButtonsParent = document.querySelector("#letterButtons");



    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].addEventListener("click", function (e) {
            writeLetterBox(e);
        })
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
    init();
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
        letterBoxes[i].value = " ";
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function writeLetterBox(selectedLetter) {
    var foundLetter = false;
    var hangmanImgEl = document.querySelector("#hangman");

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) === selectedLetter.target.value) {
            letterBoxes[i].value = selectedLetter.target.value;
            foundLetter = true;
        } 
    }

    if (foundLetter === false && hangmanImgNr < 6) {
        hangmanImgNr++;
        hangmanImgEl.src = hangmanImg[hangmanImgNr];
        console.log(hangmanImg);
    } else if (hangmanImgNr >= 6) {
        msgElem.innerHTML = ("You lose!");
    }

    selectedLetter.target.disabled = true;
    
    console.log(selectedLetter.target.value);
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function reactivateButtons() {
    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = false;
    }
}