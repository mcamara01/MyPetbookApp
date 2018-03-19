// SAMPLE CODE TO SET NEW KEY
// How to set it up a new key to database


// 1 - Include code to initialize the Firebase inside function onDeviceReady()

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

function onDeviceReady() {
	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyDyRm3-_rS5aGpattuN-cT3VfxhtYirTfk",
	    authDomain: "mypetbookapp-4d393.firebaseapp.com",
	    databaseURL: "https://mypetbookapp-4d393.firebaseio.com",
	    projectId: "mypetbookapp-4d393",
	    storageBucket: "mypetbookapp-4d393.appspot.com",
	    messagingSenderId: "353025423183"
	};
  	firebase.initializeApp(config);


	// code to create a user id on database
	var userKey = firebase.database().ref().child('users').push().key;

	const userData = {
        name: "Daenerys Targaryen",
    }

	// path to set the user key data to Firebase
    firebase.database().ref('users/' + userKey).set(userData);

    // code to create the pet id on database
    var petKey = firebase.database().ref().child('users/pet').push().key;

    const petData = {
      	name: "Drogon",
        age: "5 years",
        gender: "male",
        colour: "black",
        weight: "90 Kg"
    }

    // path to set the user key data to Firebase
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey).set(petData);
};


// After the user id and pet id are created, we can comment the code above and assign 
// the specific id from firebase to a var to use on following code

// using the keys previously created to assign vaccination
  const userKey = "-L7qtGJv81gwWN-2R1NS";
  const petKey = "-L7qujE6zObeeliWQj5p";