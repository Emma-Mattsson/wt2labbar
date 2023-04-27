// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; //Det ord som valts slumpmässigt och som användaren ska gissa på
var letterBoxes; //Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet
var hangmanImg; //Referens till img-elementet med bilden för galgen och gubben
var hangmanNr; //Nummer för aktuell bild (0-6) för den bildfil som visas
var msgElem; //Referens till div-elementer för meddelandet 
var startGameBtn; //Referens till startknappen
var letterButtons; //Array med referrenser till alla bokstavsknappar
var startTime; //Referens till att räkna tid när spelet startas 

// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    startGameBtn = document.getElementById("startGameBtn"); 

    startGameBtn.onclick = startGame;
    letterButtons = document.getElementById("letterButtons").getElementsByTagName("button"); 

    for (let i = 0; i < letterButtons.length; i++) //Går igenom alla bokstäver
    letterButtons[i].onclick = guessLetter;

    hangmanImg = document.getElementById("hangman");
    msgElem = document.getElementById("message");

    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++){ //Inaktiverar bokstavsknapparna
        letterButtons[i].disabled = true;
    }

} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad

// --------------------------------------------------

//Initiera ett nytt spel. Välj ord, visa bokstavsrutor, visa första bilden (tom bild)
//Anropas då man klickar på "starta spel"
function startGame(){ 
    randomWord();
    showLetterBoxes(); 
    hangmanImg.src = "img/h0.png";
    hangmanNr = 0;
    
    startGameBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++){ //Aktiverar bokstavsknapparna
        letterButtons[i].disabled = false;
    }

    msgElem.innerHTML = "";

    let now = new Date(); //Variabel som tar tiden
    startTime = now.getTime();

} //Slut startGame

// --------------------------------------------------

//Tar fram ett slumpmässigt ord från lista med 29 ord (0-28)
function randomWord(){
    let oldWord = selectedWord;
    
    while (oldWord === selectedWord){
        let ix = Math.floor(29 * Math.random())+1; //Genererar ett slumpmässigt heltal från arrayen, 1-29 (egentligen 0-28)
        selectedWord = wordList[ix];
    }

} //Slut randomWord

// --------------------------------------------------

//Skapar och visar bokstäver
function showLetterBoxes(){
    let newCode = ""; //Textsträng för bokstavsrutorna med HTML-koden

    for(let i = 0; i < selectedWord.length; i++){ //Går igenom alla tecken i selectedWord
        newCode += "<span>&nbsp;</span>";
    }

    document.getElementById("letterBoxes").innerHTML = newCode;
    letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");

} //Slut showLetterBoxes

// --------------------------------------------------

//Användaren klickar på en bokstavsknapp
function guessLetter(){
    this.disabled = true;
    let letter = this.value; //Referens till den bokstavsknapp användaren klickat på 
    let letterFound = false; //Refererar till om gissad bokstav är rätt

    correctLettersCount = 0;

    for(let i = 0; i < selectedWord.length; i++){ //Går igenom alla tecken i selectedWord
        if (selectedWord.charAt(i) == letter){
            document.getElementById("letterBoxes").innerHTML += "<span>" + letter + "</span>";
            
            letterFound = true;
        } 

        if (letterBoxes[i].innerHTML != "&nbsp;"){
            correctLettersCount++;
        }
    }
    
    if (!letterFound){
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        
        if (hangmanNr === 6) {
            hangmanImg.src = "img/h6.png";
            endGame(true);
        }
    }

    if (correctLettersCount === selectedWord.length){
        endGame(false);
    }

} //Slut guessLetter

// --------------------------------------------------

//Skriver ut meddelande när spelet avslutas + skriver ut tiden
function endGame(manHanged){

    let runTime = (new Date().getTime() - startTime) / 1000; //Beräknar skillnaden mellan getTime och startTime
    if (manHanged){
      msgElem.innerHTML = "Gubben hängdes, rätta ordet var: " + selectedWord;
    }
    else {
        msgElem.innerHTML = "Grattis, du gissade rätt";
    }

    startGameBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++){ //Inktiverar bokstavsknapparna
        letterButtons[i].disabled = true;
    }

    msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";

} //Slut endGame