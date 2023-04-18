// Globala variabler
var inp1Elem, inp2Elem;  //Referens till första och andra textfältet
var msgElem;  //Referens: där programmet skriver ut meddelande till användaren
var selFruitNr;  //Avläser vilken frukt som står i första textfältet
// --------------------------------------------------
// Initiering av globala variabler och händelsehanterare
function init(){
    inp1Elem = document.getElementById("input1");
    inp2Elem = document.getElementById("input2");
    msgElem = document.getElementById("message");
    selFruitNr = document.getElementById("selectedFruits");
    selFruitNr = 0;
    document.getElementById("btn1").onclick = showFruit;
    document.getElementById("btn2").onclick = addFruits; 
} // Slut init
window.onload = init; // Se till att init aktiveras då sidan är inladdad
// --------------------------------------------------

//Avläser första textfältet
function showFruit(){
    let nr = getInput(inp1Elem, 5);  //Anropar funktionen getInput och refererar till första textfält + värdet 5
    if (nr == -1) return;  
    
    document.getElementById("fruitImg").src = getUrl(nr);
    selFruitNr = nr;
} //Slut shiwFruit

//Kontroll att det skrivs en siffra i första textfältet
function getInput(elem, high){
    msgElem.innerHTML = ""
    let nr = Number(elem.value); //får ett numeriskst värde
    
    if (nr < 1 || nr > high){
        msgElem.innerHTML = "Du måste skriva ett tal mellan 1 och " + high;
        return -1;
    }
    
    if (isNaN(nr)){
        msgElem.innerHTML = "Du måste skriva ett tal med siffor";
        return -1;  
    }
    
    nr = parseInt(nr); //Avrundar till heltal
    elem.value = nr;
    
    return nr;
} //Slut getInput

//Hämtar bild-url
function getUrl(nr){
    let url;  //Url för bilden 

    switch (nr){
        case 1: url = "img/apple.png"; break;
        case 2: url = "img/banana.png"; break;
        case 3: url = "img/orange.png"; break;
        case 4: url = "img/pear.png"; break;
        case 5: url = "img/pineapple.png"; break;
        
        default: url = "img/nofruit.png"; break;
    }
    return url;
} //Slut getUrl

//Kontrollerar att en frukt är vald 
function addFruits(){
    let amount = getInput(inp2Elem, 9);  //Avläser andra textfältet
    if (amount == -1) return; 
   
    if (selFruitNr == 0){
       msgElem.innerHTML = "Välj en frukt";
       return;
    }
    
    //Kod för att visa bilder
    let imgList = "";
    let fruitUrl = getUrl(selFruitNr);
    
    for (let i = 0; i < amount; i++){
        imgList += "<img src='" + fruitUrl + "'alt='frukt'>";
    }
    document.getElementById("selectedFruits").innerHTML += imgList;
} //Slut addFruits


