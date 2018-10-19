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

    for (var i = 0; i < letterButtons.length; i++) {
        letterButtons[i].addEventListener("click", function (e) {
            writeLetterBox(e);
        })
    }

    // hangmanImg = [
    //     h0.png,
    //     h1.png,
    //     h2.png,
    //     h3.png,
    //     h4.png,
    //     h5.png,
    //     h6.png
    // ];

    // letterButtons.addEventListener("click", function(){writeLetterBox(letterButtons.value)})

    // letterButtons[0].addEventListener("click", function(){writeLetterBox("A")} );
    // letterButtons[1].addEventListener("click", function(){writeLetterBox("B")} );
    // letterButtons[2].addEventListener("click", function(){writeLetterBox("C")} );
    // letterButtons[3].addEventListener("click", function(){writeLetterBox("D")} );
    // letterButtons[4].addEventListener("click", function(){writeLetterBox("E")} );
    // letterButtons[5].addEventListener("click", function(){writeLetterBox("F")} );
    // letterButtons[6].addEventListener("click", function(){writeLetterBox("G")} );
    // letterButtons[7].addEventListener("click", function(){writeLetterBox("H")} );
    // letterButtons[8].addEventListener("click", function(){writeLetterBox("I")} );
    // letterButtons[9].addEventListener("click", function(){writeLetterBox("J")} );
    // letterButtons[10].addEventListener("click", function(){writeLetterBox("K")} );
    // letterButtons[11].addEventListener("click", function(){writeLetterBox("L")} );
    // letterButtons[12].addEventListener("click", function(){writeLetterBox("M")} );
    // letterButtons[13].addEventListener("click", function(){writeLetterBox("N")} );
    // letterButtons[14].addEventListener("click", function(){writeLetterBox("O")} );
    // letterButtons[15].addEventListener("click", function(){writeLetterBox("P")} );
    // letterButtons[16].addEventListener("click", function(){writeLetterBox("Q")} );
    // letterButtons[17].addEventListener("click", function(){writeLetterBox("R")} );
    // letterButtons[18].addEventListener("click", function(){writeLetterBox("S")} );
    // letterButtons[19].addEventListener("click", function(){writeLetterBox("T")} );
    // letterButtons[20].addEventListener("click", function(){writeLetterBox("U")} );
    // letterButtons[21].addEventListener("click", function(){writeLetterBox("V")} );
    // letterButtons[22].addEventListener("click", function(){writeLetterBox("W")} );
    // letterButtons[23].addEventListener("click", function(){writeLetterBox("X")} );
    // letterButtons[24].addEventListener("click", function(){writeLetterBox("Y")} );
    // letterButtons[25].addEventListener("click", function(){writeLetterBox("Z")} );
    // letterButtons[26].addEventListener("click", function(){writeLetterBox("Å")} );
    // letterButtons[27].addEventListener("click", function(){writeLetterBox("Ä")} );
    // letterButtons[28].addEventListener("click", function(){writeLetterBox("Ö")} );


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

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord.charAt(i) == selectedLetter.target.value) {
            letterBoxes[i].value = selectedLetter.target.value;
            foundLetter = true;
        } 
    }

    if (foundLetter === false) {

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