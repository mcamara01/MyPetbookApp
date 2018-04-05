// SAMPLE CODE TO SET NEW KEY
// How to set it up a new key to database


// 1 - Include code to initialize the Firebase inside function onDeviceReady()

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeNewKey = false;

function onDeviceReady() {

  if (initializeNewKey) {
    return 
  } else {
    initializeNewKey = true;
  }

  firebase.initializeApp(config);

    



//     // code to create the pet id on database
//     var petKey = firebase.database().ref().child('users/pet').push().key;

//     const petData = {
//       	name: "Drogon",
//         age: "5 years",
//         gender: "male",
//         colour: "black",
//         weight: "90 Kg"
//     }

//     // path to set the user key data to Firebase
//     firebase.database().ref('users/' + userKey + "/pet/" +  petKey).set(petData);
};


// // After the user id and pet id are created, we can comment the code above and assign 
// // the specific id from firebase to a var to use on following code

// // using the keys previously created to assign vaccination
//   const userKey = "-L7qtGJv81gwWN-2R1NS";
//   const petKey = "-L7qujE6zObeeliWQj5p";