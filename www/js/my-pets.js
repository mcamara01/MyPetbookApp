// PET PROFILE PAGE JS
//---------------------------------------------------------------------- 

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeMyPets = false;

function onDeviceReady() {

	if (initializeMyPets) {
    return 
  } else {
    initializeMyPets = true;
  }

	var userKey = localStorage.getItem('userKey');
	var petKey = localStorage.getItem('petKey');

  
  
	localStorage.setItem("userKey", userKey);
	localStorage.setItem("petKey", petKey);

 

};