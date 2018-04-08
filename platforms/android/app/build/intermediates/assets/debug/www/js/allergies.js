// ALLERGIES PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeAllergy = false;

function onDeviceReady() {

  if (initializeAllergy) {
    return
  } else {
    initializeAllergy = true;
  }

	// Save ALLERGY Data Button from New allergy Screen

	$('#save-allergy-btn').click(function(){
		var saveAllergyData = {
			allergicto: $('#new-allergy-name').val(),
    }

	// code to create an allergy id on database
	var allergyId = firebase.database().ref().child('users/pet/allergies').push().key;

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergyId).set(saveAllergyData);

	// return to main allergies page
  window.location.replace("./allergy.html");
});

	const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add vaccine related to a pet into Firebase

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/").on('child_added', function(data){

    const allergyId = data.key;
    const saveAllergyDataObj = data.val();

    $('#load-card').prepend(`<div id="${allergyId}"><div id="card" class="box-shadow-all-light">
      <section id="allergy-card" >
    		<section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-allergy">Edit</a></li>
              <br>
              <li><a href="#" id="delete-allergy" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 class="field-info">Allergic to</h4>
          <p id="allergy-name" class="field-response">${saveAllergyDataObj.allergicto}</p>
        </section>
			</section>
    </div></div>`)

    // Display the menu elipse for each card/allergyId

    $(`#${allergyId} #menu-elipse`).click(function() {
      $(`#${allergyId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific allergy Data Stored

    $(`#${allergyId} #edit-allergy`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-allergy-id').val(allergyId);
      $('#edit-allergy-name').val(saveAllergyDataObj.allergicto);

      $('#imgPop').addClass("display-none");

    });


    // Delete card for a specific allergy entry

    $(`#${allergyId} #delete-allergy`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-allergy-id').val(allergyId);
      $('#delete-allergy-name').val(saveAllergyDataObj.allergicto);

      $('#imgPop').addClass("display-none");
    });

    // Delete allergie from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergyId).on('child_removed', function(data){
      $(`#${allergyId}`).remove();
    });
  }); //End of function "on child_added"


	// Edit allergy Button Submition Action from Edit allergy Screen
  $('#edit-allergy-btn').click(function(){
    var editAllergyData = {
      allergicto: $('#edit-allergy-name').val()
    }
    var allergyId = $('#edit-allergy-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergyId).set(editAllergyData);

    window.location.replace("./allergy.html");
  });

  // Delete allergy Button Submition Action from Edit allergy Screen

  $(`#delete-allergy-btn`).click(function(){
    var allergyId = $('#delete-allergy-id').val();
    console.log(allergyId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergyId).remove();

    window.location.replace("./allergy.html");
    });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./allergy.html");
  });


  // Add allergy from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit allergy Entry from Elipse Menu

  $('#edit-allergy').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");


  });

  // Display Delete allergy Card after Choosing Entry from Elipse Menu

  $('#delete-allergy').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });



  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE allergyS SCREEN

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editAllergy').removeClass("display-none");
  });

  $("#editAllergy").click(function(){
    $("#editAllergy").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteAllergy').removeClass("display-none");
  });

  $("#deleteAllergy").click(function(){
    $("#deleteAllergy").addClass("display-none");
  });

};
