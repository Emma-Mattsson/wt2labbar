// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const allCarImgs = [	// Array med filnamn för bilderna med bilen
	[], // Inga bilar för index 0
	["ferrari_up.png", "ferrari_right.png", "ferrari_down.png", "ferrari_left.png"],
	["jeep_up.png", "jeep_right.png", "jeep_down.png", "jeep_left.png"],
	["vw_up.png", "vw_right.png", "vw_down.png", "vw_left.png"]
];
var carImgs;			// Array med vald bil (någon av ovanstående arrayer)
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
var carMenu;			// Referens till menyn för att välja bil

/* ===== Tillägg i labben ===== */
var pigElem; 				//Referens till img-taggen för vildsvinet
var pigTimerRef = null; 	//Referens till timern för vildsvinet
const pigDuration = 2000; 	//Tiden till ett nytt vildsvin
var pigNr; 					//Nummer för aktuell gris
var hitCounter; 			//Antal träffar
var pigNrElem; 				//Referens till nummer för aktuell gris
var hitCounterElem; 		//Referens till antal träffar
var catchedPig; 			//Flagga för om vildsvinen har träffats eller ej

// --------------------------------------------------
// Bilderna laddas in i förväg, så att alla bilder finns i webbläsarens cache, när de behövs
for (let i = 0; i < allCarImgs.length; i++) {
	for (let j = 0; j < allCarImgs[i].length; j++) {
		let img = new Image();		//Referens till img-elemetet
		img.src = "img/" + allCarImgs[i][j];
	}
}
{ // Förladda "smack"-bilden
	let img = new Image(); 	//Referens till img-elemetet
	img.src = "img/smack.png";
}
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
	// Referenser till element i gränssnittet
	boardElem = document.getElementById("board");
	carElem = document.getElementById("car");
	startBtn = document.getElementById("startBtn");
	stopBtn = document.getElementById("stopBtn");
	carMenu = document.getElementById("carMenu");
	// Lägg på händelsehanterare
	document.addEventListener("keydown", checkKey);
	// Känna av om användaren trycker på tangenter för att styra bilen
	startBtn.addEventListener("click", startGame);
	stopBtn.addEventListener("click", stopGame);
	carMenu.addEventListener("change", chooseCar);
	// Aktivera/inaktivera knappar
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;
	// Första bil
	carImgs = allCarImgs[1];
	carElem.src = "img/" + carImgs[carDir];

	/* === Tillägg i labben === */
	pigElem = document.getElementById("pig");
	pigNrElem = document.getElementById("pigNr");
	hitCounterElem = document.getElementById("hitCounter");
	
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) { // Anropas vid keydown
	let k = e.key;	//När tangentbordknappen k trycks ner tilldelas e.key
	switch (k) {
		case "ArrowLeft":
		case "z":
			e.preventDefault();
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case "ArrowRight":
		case "-":
			e.preventDefault();
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // Slut checkKey
// --------------------------------------------------
// Val av bil genom menyn. Array med valda bildfiler läggs in i carImgs
function chooseCar() {
	carImgs = allCarImgs[this.selectedIndex];
	carElem.src = "img/" + carImgs[carDir];
	this.selectedIndex = 0;
} // Slut chooseCar
// --------------------------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carMenu.disabled = true;
	document.activeElement.blur(); // Knapparna sätts ur focus, så att webbsidan kommer i fokus igen
	// Detta behövs för att man ska kunna känna av händelsen keydown i Firefox.
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();

	/* === Tillägg i labben === */
	pigNr = 0;
	hitCounter = 0;
	pigNrElem.innerHTML = 0;
	hitCounterElem.innerHTML = 0;
	catchedPig = true;
	pigTimerRef = setTimeout(newPig, pigDuration); //Startar tid för vildsvinet
	
} // Slut startGame
// --------------------------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	carMenu.disabled = false;

	/* === Tillägg i labben === */
	if (pigTimerRef !=null) clearTimeout(pigTimerRef);
	pigElem.style.visibility = "hidden";
} // Slut stopGame
// --------------------------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth; //Räknar ut x-koordinat
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight; //Räknar ut y-koordinat
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar, timerStep);

	/* === Tillägg i labben === */
	checkHit();
	
} // Slut moveCar
// --------------------------------------------------

/* ===== Tillägg av nya funktioner i labben ===== */
//Ta fram nytt vildsvin
function newPig() {
	if (pigNr < 10) {
		let xLimit = boardElem.offsetWidth - pigElem.offsetWidth - 20; //Räknar ut x-koordinat
		let yLimit = boardElem.offsetHeight - pigElem.offsetHeight - 20; //Räknar ut x-koordinat
		let x = Math.floor(xLimit * Math.random()) + 10; //Nytt värde för x
		let y = Math.floor(yLimit * Math.random()) + 10; //Nytt värde för y
		pigElem.style.left = x + "px";	// x-koordinat (left) för vildsvinet
		pigElem.style.top = y + "px";	// y-koordinat (top) för vildsvinet
		pigElem.src = "img/pig.png";
		pigElem.style.visibility = "visible";
		pigNr++;
		pigNrElem.innerHTML = pigNr;
		catchedPig = false;
		pigTimerRef = setTimeout(newPig, pigDuration);

	}
	else stopGame();
} //Slut newPig

//Kontroll om bilen träffat vildsvinet
function checkHit() {
	if (catchedPig) return; //Gris träffad
	let cSize = carElem.offsetWidth; //Bilens bredd/höjd 
	let pSize = pigElem.offsetWidth; //Vildsvinets bredd/höjd
	let cL = parseInt(carElem.style.left); //Bilens left
	let cT = parseInt(carElem.style.top); //Bilens top
	let pL = parseInt(pigElem.style.left); //Vildsvinets left
	let pT = parseInt(pigElem.style.top); //Vildsvinets top

	if (cL+10 < pL+pSize && cL+cSize-10 > pL && cT+10 < pT+pSize && cT+cSize-10 > pT) {
		if (pigTimerRef != null) clearTimeout(pigTimerRef); //Stoppar timer för vildsvin

		pigElem.src = "img/smack.png";
		hitCounter++;
		hitCounterElem.innerHTML = hitCounter;
		catchedPig = true;
		pigTimerRef = setTimeout(newPig, pigDuration); //Startar timer för nytt vildsvin
	}
}