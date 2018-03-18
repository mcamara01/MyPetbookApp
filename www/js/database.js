// // Requiring Firebase
// const firebase = require('firebase');

// // Initialize Firebase
//  var config = {
//     apiKey: "AIzaSyAaIffXjHEAB-FkkhTUyT4DUHekh2QU1xk",
//     authDomain: "vaccination-5df90.firebaseapp.com",
//     databaseURL: "https://vaccination-5df90.firebaseio.com",
//     projectId: "vaccination-5df90",
//     storageBucket: "",
//     messagingSenderId: "1059452936800"
//   };
//   firebase.initializeApp(config);

//-------------------------------------------
// Add new Vaccine to the Firebase

// function newVaccine (saveVaccineData) {

// 	// Get a key for a new vaccine
// 	var newVaccineKey = firebase.database().ref().child('vaccination').push().key;

// 	firebase.database().ref('vaccination/' + newVaccineKey).set(saveVaccineData);
// }

// // Exporting writeNewUser function 
// return module.exports = {newVaccine: newVaccine}




 const vaccination = firebase.database().ref('/vaccination');

 vaccination.on('child_added', function())
