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



	firebase.database().ref('users/' + userKey + "/pet/" +  petKey).on('child_added', function(data){
		if (data.key != "general") {
			return;
		}
		

		const generalInfoDataObj = data.val();
		
		$('#pet-name').text(generalInfoDataObj.name);
		$('#pet-dob').text(generalInfoDataObj.dob);
		$('#pet-gender').text(generalInfoDataObj.gender);
		$('#pet-colour').text(generalInfoDataObj.colour);
		$('#pet-weight').text(generalInfoDataObj.weight);

		



		// $('#pet-age').text(petAge);
		// Display Edit Card after Choosing Edit General Info Entry from Elipse Menu

		$('#edit-general-info').click(function(){
			$('#edit-pet-name').val(generalInfoDataObj.name);
			$('#edit-pet-dob').val(generalInfoDataObj.dob);
			$('#edit-pet-gender').val(generalInfoDataObj.gender);
			$('#edit-pet-colour').val(generalInfoDataObj.colour);
			$('#edit-pet-weight').val(generalInfoDataObj.weight);

		});

		// PET HEADER

		$("#header-pet-name").text(generalInfoDataObj.name);

		// // get the dob added and calculate age
	 //    var dobAdded = generalInfoDataObj.dob;
	 //    var petAge = getAge(dobAdded);
	 //    // console.log(getAge(dobAdded));

	 //    //show age calculated on html
	 //    $('#pet-age').html(petAge);

	 //    //function to calculate pet age
	 //    function getAge(dateString) {
	 //      var now = new Date();

	 //      var yearNow = now.getFullYear();
	 //      var monthNow = now.getMonth()+1; //starts from 0
	 //      var dateNow = now.getDate();

	 //      var dob = new Date(dateString.substring(0,4),
	 //                         dateString.substring(5,7),
	 //                         dateString.substring(8,10)
	 //                         );

	 //      var yearDob = dob.getFullYear();
	 //      var monthDob = dob.getMonth();
	 //      var dateDob = dob.getDate();
	 //      var age = {};
	 //      var ageString = "";
	 //      var yearString = "";
	 //      var monthString = "";
	 //      var dayString = "";


	 //      yearAge = yearNow - yearDob;

	 //      if (monthNow >= monthDob)
	 //        var monthAge = monthNow - monthDob;
	 //      else {
	 //        yearAge--;
	 //        var monthAge = 12 + monthNow -monthDob;
	 //      }

	 //      if (dateNow >= dateDob)
	 //        var dateAge = dateNow - dateDob;
	 //      else {
	 //        monthAge--;
	 //        var dateAge = 31 + dateNow - dateDob;

	 //        if (monthAge < 0) {
	 //          monthAge = 11;
	 //          yearAge--;
	 //        }
	 //      }

	 //      age = {
	 //          years: yearAge,
	 //          months: monthAge,
	 //          days: dateAge
	 //          };

	 //      if ( age.years > 1 ) yearString = " years";
	 //      else yearString = " year";
	 //      if ( age.months> 1 ) monthString = " months";
	 //      else monthString = " month";
	 //      if ( age.days > 1 ) dayString = " days";
	 //      else dayString = " day";

	 //      // console.log("pet name" + savePetDataObj.general.name);
	 //      // console.log("age.years" + age.years);
	 //      // console.log("age.months" +age.months);
	 //      // console.log("age.days" +age.days);

	 //      if ( (age.years > 0) && (age.months > 0) )
	 //        ageString = age.years + yearString + " and " + age.months + monthString;
	 //      else if ( (age.years == 0) && (age.months == 0))
	 //        ageString = age.days + dayString;
	 //      else if ( (age.years > 0) && (age.months == 0) )
	 //        ageString = age.years + yearString +". Happy Birthday ${savePetDataObj.general.name}!!";
	 //      else if ( (age.years > 0) && (age.months > 0) )
	 //        ageString = age.years + yearString + " and " + age.months + monthString + " old.";
	 //      else if ( (age.years == 0) && (age.months > 0) )
	 //        ageString = age.months + monthString;
	 //      else if ( (age.years > 0) && (age.months == 0) )
	 //        ageString = age.years + yearString;
	 //      else if ( (age.years == 0) && (age.months > 0) )
	 //        ageString = age.months + monthString;
	 //      else ageString = "Oops! Could not calculate age!";

	 //      return ageString;
	 //    }

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
	        gender: $('#edit-pet-gender').val(),
	        colour: $('#edit-pet-colour').val(),
	        weight: $('#edit-pet-weight').val(),		
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





