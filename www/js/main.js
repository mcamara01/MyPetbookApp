//----------------------
// MAIN JAVASCRIPT CODE

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initialize = false;

//Get the user key from LocalStorage if there's one 
var userKey;

//Get the petId from LocalStorage if there's one 
var petKey;


  
function onDeviceReady() {
  if (initialize) {
    return 
  } else {
    initialize = true;
  }

  //Get the user key from LocalStorage if there's one 
  userKey = localStorage.getItem('userKey');

  //Get the petId from LocalStorage if there's one 
  petKey = localStorage.getItem('petKey');
  //----------------------
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

  // top options nav open window
  $('#menu-hamb').click(function() {
      $('#top-options-nav').slideToggle("slow");
  });
 
  // ELIPSE MENU OPTIONS

  $('#menu-elipse').click(function() {
      $('#elipse-options-nav').slideToggle("slow");
  });
  
};

  