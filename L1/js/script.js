var inp1Elem, inp2Elem;
var resElem;

function init () {
    inp1Elem = document.getElementById("input1");
    inp2Elem = document.getElementById("input2");
    resElem = document.getElementById("result");
    document.getElementById("runBtn").onclick = areaCalculations;
} //slut init
window.onload = init;

function areaCalculations(){
    let length; //längd i meter
    let width; //bredd i meter
    let area; //yta i kvardratmeter

    length = Number(inp1Elem.value);
    width = Number(inp2Elem.value);

    resElem.innerHTML = length;

    //area för en rektangel
    area = length * width;
    resElem.innerHTML = "<p>Rektangelns area är "+ area + " m<sup>2</sup></p>";

    //area för ellips
    area = 3.14 * length * width / 4;
    resElem.innerHTML += "<p>Ellipsens area är " + area +" m<sup>2</sup></p>";

    //rektangelns area då längden ökas med 5 meter
    area = (length + 5) * width;
    resElem.innerHTML += "<p>Då längden ökas med 5 meter blir rektangelns area "+ area +" m<sup>2</sup></p>";
    
    //egna tillägg
    //area för rektangel med med 50% ökad längd och 3m ökad bredd
    area = (length * 1.5) * (width + 3);
    resElem.innerHTML += "<p>Då längden ökas med 50% och bredden 3 meter blir rektangelns area "+ area +" m<sup>2</sup></p>";

    //triangelns area i kvadratfot
    area = (3.28 * length) * (width * 3.28) / 2;
    resElem.innerHTML += "<p>Triangelns area blir "+ area +" kvadratfot<sup></sup></p>";
} 
//slut areaCalculations 


