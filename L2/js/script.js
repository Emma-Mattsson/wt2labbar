// Globala variabler
var inp1Elem, inp2Elem;  //Referens till första och andra textfältet
var msgElem;  //Referens: där programmet skriver ut meddelande till användaren
// --------------------------------------------------
// Initiering av globala variabler och händelsehanterare
function init(){
    inp1Elem = document.getElementById("input1");
    inp2Elem = document.getElementById("input2");
    msgElem = document.getElementById("message");
    document.getElementById("btn1").onclick = showFruit;
} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Avläser första textfältet
function showFruit(){
    let nr = getInput(inp1Elem, 5);  //Anropar funktionen getInput och refererar till första textfält + värdet 5
    if (nr == -1) return;  
    let url;  //Deklarerar url som får nytt värde i switch-satsen
    
    //Kontrollerar nr, fruktbild visas beroende på nummer/case
    switch (nr){
        case 1: url = "img/apple.png"; break;
        case 2: url = "img/banana.png"; break;
        case 3: url = "img/orange.png"; break;
        case 4: url = "img/pear.png"; break;
        case 5: url = "img/pineapple.png"; break;
        
        default: url = "img/nofruit.png"; break;
    }
    
    //Hämtar referens till elementet med ID "fruitImg"
    var fruitImg = document.getElementById("fruitImg");
    fruitImg.src = url;  //Byter ut bilden i img-taggen med annan bild-url
}

//Kontroll att det skrivs en siffra i första textfältet
function getInput(elem, high){
    let nr = Number(elem.value);

    if (isNaN(nr)){
        msgElem.innerHTML = "Du måste skriva ett tal med siffor";
        return -1;  
    }
    return nr;
}


