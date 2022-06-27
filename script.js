const secretPhrases = ["never", "letter", "resume", "javascript", "window"];

let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem() {
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandeler);
    console.log(randomItem);
}

function setUnderScores() {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map((letter) =>
        clicked.indexOf(letter) >= 0 ? letter : "_"
    );
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

function checkIfWon() {
    if (result === randomItem) {
        document.getElementById("gameover").querySelector("p").style.display =
            "block";
        document.getElementById("images").querySelector("img").src =
            "./images/winner.png";
    }
}

function checkIfMistake() {
    document
        .getElementById("images")
        .querySelector("img").src = `./images/hangman${mistakes}.png`;
}

function checkIfLoser() {
    if (mistakes === 6) {
        document.getElementById("images").querySelector("img").src =
            "./images/hangman6.png";

        document.getElementById("gameover").querySelector("p").style.display =
            "block";
        document.getElementById(
            "clue"
        ).innerHTML = `<p>The word was:${randomItem}</p>`;
    }
}

function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderScores();
        checkIfWon();
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++;
        checkIfLoser();
        checkIfMistake();
    }
}

function buttonHandler(event) {
    letterHandler(event.target.id);
}

function keyHandeler(event) {
    letterHandler(event.key);
}

selectRandomItem();
setUnderScores();