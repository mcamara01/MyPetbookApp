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
		$('#pet-photo').attr('src', generalInfoDataObj.image);


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
	        image: $('#pet-photo').attr('src')
		}

	  	// path to set the edited general info data to Firebase
	    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/general/").set(editGeneralInfoData);

			//if changed name, age or photo, update on localStorage too
			var petAge = getAge($('#edit-pet-dob').val());
			var petName = $('#edit-pet-name').val();
			var petImg = $('#pet-photo').attr('src');
			localStorage.setItem("petAge", petAge);
      localStorage.setItem("petName", petName);
      localStorage.setItem("imageSrc", petImg);

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


	//function to calculate new pet age
	function getAge(dateString) {

		console.log('this is the' + dateString);
		var now = new Date();

		var yearNow = now.getFullYear();
		var monthNow = now.getMonth()+1; //starts from 0
		var dateNow = now.getDate();

		var dob = {
			year: dateString.substring(0,4),
			month: dateString.substring(5,7),
			day: dateString.substring(8,10)
		};

		var yearDob = dob.year;
		var monthDob = dob.month;
		var dateDob = dob.day;
		var age = {};
		var ageString = "";
		var yearString = "";
		var monthString = "";
		var dayString = "";


		yearAge = yearNow - yearDob;

		if (monthNow >= monthDob)
			var monthAge = monthNow - monthDob;
		else {
			yearAge--;
			var monthAge = 12 + monthNow -monthDob;
		}

		if (dateNow >= dateDob)
			var dateAge = dateNow - dateDob;
		else {
			monthAge--;
			var dateAge = 31 + dateNow - dateDob;

			if (monthAge < 0) {
				monthAge = 11;
				yearAge--;
			}
		}



		age = {
				years: yearAge,
				months: monthAge,
				days: dateAge
				};

		console.log(age)

		if ( age.years > 1 ) yearString = " years";
		else yearString = " year";
		if ( age.months> 1 ) monthString = " months";
		else monthString = " month";
		if ( age.days > 1 ) dayString = " days";
		else dayString = " day";

		// console.log("pet name" + savePetDataObj.general.name);
		// console.log("age.years" + age.years);
		// console.log("age.months" +age.months);
		// console.log("age.days" +age.days);

		if ( (age.years > 0) && (age.months > 0) )
			ageString = age.years + yearString + " and " + age.months + monthString;
		else if ( (age.years == 0) && (age.months == 0))
			ageString = age.days + dayString;
		else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
			ageString = age.years + yearString +". Happy Birthday " + $('#edit-pet-name').val() + "!";
		else if ( (age.years > 0) && (age.months > 0) )
			ageString = age.years + yearString + " and " + age.months + monthString + " old.";
		else if ( (age.years == 0) && (age.months > 0) )
			ageString = age.months + monthString;
		else if ( (age.years > 0) && (age.months == 0) )
			ageString = age.years + yearString;
		else if ( (age.years == 0) && (age.months > 0) )
			ageString = age.months + monthString;
		else ageString = "Oops! Could not calculate age!";

		return ageString;
	}
};

//add pet photo from gallery function =======================================================
function readURL(input) {
	 if (input.files && input.files[0]) {
			 var reader = new FileReader();

			 reader.onload = function (e) {
					 $('#pet-photo').attr('src', e.target.result);
					 console.log(e.target.result);
			 };
			 reader.readAsDataURL(input.files[0]);
	 }
 };
