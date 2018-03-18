// Requiring Firebase
const firebase = require('firebase');

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyAaIffXjHEAB-FkkhTUyT4DUHekh2QU1xk",
    authDomain: "vaccination-5df90.firebaseapp.com",
    databaseURL: "https://vaccination-5df90.firebaseio.com",
    projectId: "vaccination-5df90",
    storageBucket: "",
    messagingSenderId: "1059452936800"
  };
  firebase.initializeApp(config);

// Exporting Firebase
return module.exports = {firebase: firebase}
