// GENERAL INFO PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeGenInfo = false;

function onDeviceReady() {

	if (initializeGenInfo) {
    return
  } else {
    initializeGenInfo = true;
  }


  	console.log(userKey);

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey).on('child_added', function(data){
		if (data.key != "general") {
			return;
		}


		const generalInfoDataObj = data.val();

		$('#pet-name').text(generalInfoDataObj.name);
		$('#pet-dob').text(generalInfoDataObj.dob);
		$('#pet-gender').text(generalInfoDataObj.gender);
		$('#pet-color').text(generalInfoDataObj.color);
		$('#pet-weight').text(generalInfoDataObj.weight + " kg(s)");





		// $('#pet-age').text(petAge);
		// Display Edit Card after Choosing Edit General Info Entry from Elipse Menu

		$('#edit-general-info').click(function(){
			$('#edit-pet-name').val(generalInfoDataObj.name);
			$('#edit-pet-dob').val(generalInfoDataObj.dob);

			let gender = generalInfoDataObj.gender;
			if(gender == "Male") {
				$('input[name=gender][value="Male"]').attr('checked', 'checked');
			} else {
				$('input[name=gender][value="Female"]').attr('checked', 'checked');
			}

			$('#edit-pet-color').val(generalInfoDataObj.color);
			$('#edit-pet-weight').val(generalInfoDataObj.weight);

		});

		// PET HEADER

		// $("#header-pet-name").text(generalInfoDataObj.name);


	}); //end of child_added function

	// Enable functionality of edit option, in case there's no general information
	$('#edit-general-info').click(function(){
		$(".cards").addClass("display-none");
		$('#edit-card').removeClass('display-none');
	});

    const users = firebase.database().ref('/users');

	// Edit General Info Button Submition Action from Edit General Info Screen
	$('#edit-generalInfo-btn').click(function(){
		var editGeneralInfoData = {
			name: $('#edit-pet-name').val(),
	        dob: $('#edit-pet-dob').val(),
	        gender: $('input[name=gender]:checked').val(),
	        color: $('#edit-pet-color').val(),
	        weight: $('#edit-pet-weight').val(),
	        image: imageSrc,
		}

	  	// path to set the edited general info data to Firebase
	    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/general/").set(editGeneralInfoData);

	  	// return to main vaccination page
	    window.location.replace("./general-info.html");
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
