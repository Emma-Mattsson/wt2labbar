// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];	// Pris för tilläggen
var formElem;		// Referens till elementet med hela formuläret
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare. Lägg till info om pris.
function init() {
	formElem = document.getElementById("booking");

	for (let i = 0; i < formElem.roomType.length; i++) {
		formElem.roomType[i].addEventListener("click", checkIfFamilyRoom);
		formElem.roomType[i].nextSibling.textContent += " (" + roomPrice[i] + " kr)";
		formElem.roomType[i].addEventListener("click", calculateCost);
	}

	for (let i = 0; i < formElem.facility.length; i++) {
		formElem.facility[i].nextSibling.textContent += " (" + facilityPrice[i] + " kr)";
		formElem.facility[i].addEventListener("click", calculateCost);
	}

	formElem.nrOfNights.addEventListener("change", calculateCost);
	
	checkIfFamilyRoom();
	calculateCost();
	
	// Händelsehanterare för textfält som ska kontrolleras
	formElem.city.addEventListener("blur", checkCity);
	formElem.zipcode.addEventListener("blur", checkField);
	formElem.telephone.addEventListener("blur", checkField);
	
	// Händelsehanterare för kampanjkod
	formElem.campaigncode.addEventListener("focus", checkCampaign);
	formElem.campaigncode.addEventListener("keyup", checkCampaign);
	formElem.campaigncode.addEventListener("blur", endCheckCampaign);
	
} // Slut init
window.addEventListener("load", init);
// --------------------------------------------------

//Kontrollerar om familjerummet har valts eller ej
function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked) {
		formElem.persons.disabled = false;
		formElem.persons.parentNode.style.color = "#000";
		formElem.facility[2].disabled = true;
		formElem.facility[2].parentNode.style.color = "#999";
		formElem.facility[2].checked = false;
	}
	else {
		formElem.persons.disabled = true;
		formElem.persons.parentNode.style.color = "#999";
		formElem.facility[2].disabled = false;
		formElem.facility[2].parentNode.style.color = "#000";
	}
} //Slut checkIfFamilyRoom
// --------------------------------------------------

//Beräknar den totala kostnaden
function calculateCost() {
	let price = 0;	//Priset för rummet
	let nrOfNights = formElem.nrOfNights.value; //Antal nätter


	for (let i = 0; i < formElem.roomType.length; i++) {
		if (formElem.roomType[i].checked) {
			price = roomPrice[i];
			break;
		}
	}

	for (let i = 0; i < formElem.facility.length; i++) {
		if (formElem.facility[i].checked) {
			price += facilityPrice[i];
		}
	}

	var totalCostElem = document.getElementById('totalCost'); //Priset för totalkostnaden
	totalCostElem.textContent = nrOfNights * price;	

} //Slut calculateCost
// --------------------------------------------------

//Konvertera textfältet till versaler
function checkCity() {
	let city = this.value; //Vilken ort som väljs 
	city = city.toUpperCase();
	this.value = city;
} //Slut checkCity
// --------------------------------------------------

//Kontrollerar fält med postnummer och telefon nummer med reguljära uttryck
function checkField() {
	const fieldNames = ["zipcode", "telephone"]; //Referens till textfältsnamnen
	const re = [ //Aray med reguljära uttryck för fälten
		/^\d{3} ?\d{2}$/,			//Postnummer
		/^\d{1,3}[-/ ]?\d{5,8}$/	//Telefonnummer
	];
	const errMsg = [ //Referens till felmeddelanden som skrivs ut
		"Postnumret måste bestå av fem siffror.",
		"Telefonnummer måste börja med en 0:a och följas av 6-11 siffror."
	];
	let ix = fieldNames.indexOf(this.name); //Index till re och errMsg
	let errMsgElem = this.nextElementSibling; //Element för felmeddelanden
	errMsgElem.innerHTML = "";
	
	if (!re[ix].test(this.value)) {
		errMsgElem.innerHTML = errMsg[ix];
		return false; //Fel i fältet
	}
	else return true; //Fältet är OK
} //Slut checkField
// --------------------------------------------------

//Kontroll av rätt mönster på kampanjkod
function checkCampaign() {
	let re = /^[a-zA-Z0-9]{3}-\d{2}-[a-zA-Z0-9]{2}$/ //Rätt mönster för kampanjkoden
	if (re.test(this.value)) this.style.backgroundColor = "#6F9";
	else this.style.backgroundColor = "#F99";
	
} //Slut checkCampaign
// --------------------------------------------------

//Kontroll om rätt kampanjkod
function endCheckCampaign() {
	this.style.backgroundColor = "";
	let campaigncode = this.value; //Vilken kampanjkod som skrivs in 
	campaigncode = campaigncode.toUpperCase();
	this.value = campaigncode;
} //Slut endCheckCampaign