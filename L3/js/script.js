// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANTÖRA", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD"]; // Lista (array) med ord som ska väljas slumpmässigt
var selectedWord; //Det ord som valts slumpmässigt och som användaren ska gissa på
var letterBoxes; //Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet
var hangmanImg; //Referens till img-elementet med bilden för galgen och gubben
var hangmanNr; //Nummer för aktuell bild (0-6) för den bildfil som visas
var msgElem; //Referens till div-elementer för meddelandet 

// --------------------------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    let startGameBtn = document.getElementById("startGameBtn"); //Referens till startknappen

    startGameBtn.onclick = startGame;
    let letterButtons = document.getElementById("letterButtons").getElementsByTagName("button"); //Array med referrenser till alla bokstavsknappar

    

} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

function startGame(){

}