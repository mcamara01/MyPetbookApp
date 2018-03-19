// GENERAL INFO PAGE JS
//---------------------------------------------------------------------- 

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);


function onDeviceReady() {

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

	// using the keys previously created to load general info
	const userKey = "-L7qtGJv81gwWN-2R1NS";
	const petKey = "-L7qujE6zObeeliWQj5p";

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey).on('child_added', function(data){
		if (data.key != "general-info") {
			return;
		}
		
		const generalInfoDataObj = data.val();
		
		$('#pet-name').text(generalInfoDataObj.name);
		$('#pet-age').text(generalInfoDataObj.age);
		$('#pet-gender').text(generalInfoDataObj.gender);
		$('#pet-colour').text(generalInfoDataObj.colour);
		$('#pet-weight').text(generalInfoDataObj.weight);


		// Display Edit Card after Choosing Edit General Info Entry from Elipse Menu

		$('#edit-general-info').click(function(){
			$('#edit-pet-name').val(generalInfoDataObj.name);
			$('#edit-pet-age').val(generalInfoDataObj.age);
			$('#edit-pet-gender').val(generalInfoDataObj.gender);
			$('#edit-pet-colour').val(generalInfoDataObj.colour);
			$('#edit-pet-weight').val(generalInfoDataObj.weight);

		});

	}); //end of child_added function

	// Enable functionality of edit option, in case there's no general information
	$('#edit-general-info').click(function(){
		$(".cards").addClass("display-none");
		$('#edit-card').removeClass('display-none');
	});

    const users = firebase.database().ref('/users');




	// Edit Allergie Button Submition Action from Edit Allergie Screen
	$('#edit-generalInfo-btn').click(function(){
		var editGeneralInfoData = {
			name: $('#edit-pet-name').val(),
	        age: $('#edit-pet-age').val(),
	        gender: $('#edit-pet-gender').val(),
	        colour: $('#edit-pet-colour').val(),
	        weight: $('#edit-pet-weight').val(),		
		}

	  	// path to set the edited general info data to Firebase
	    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/general-info/").set(editGeneralInfoData);

	  	// return to main vaccination page
	    window.location.replace("./general-info.html");
   	});
	

	// Edit a specific Allergie Data Stored 

    $(`#edit-allergie`).click(function(){
      

      $('#edit-allergie-id').val(allergieId);
      $('#edit-allergie-name').val(saveAllergieDataObj.allergicto);
    
    });	


	// POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE ALLERGIES SCREEN

	// Edit Info Popup
	$('#edit-info').click(function(){
	$('#editGeneralInfo').removeClass("display-none");
	}); 

	$("#editGeneralInfo").click(function(){
	$("#editGeneralInfo").addClass("display-none");
	});
};





