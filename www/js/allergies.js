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
	
	// Save ALLERGIE Data Button from New Allergie Screen

	$('#save-allergie-btn').click(function(){
		var saveAllergieData = {
			allergicto: $('#new-allergie-name').val(),   
    }

	// code to create an allergie id on database
	var allergieId = firebase.database().ref().child('users/pet/allergies').push().key;

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).set(saveAllergieData);

	// return to main allergies page
  window.location.replace("./allergie.html");
});

	const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add vaccine related to a pet into Firebase

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/").on('child_added', function(data){
  
    const allergieId = data.key;
    const saveAllergieDataObj = data.val();

    $('#load-card').prepend(`<div id="${allergieId}"><div id="card" class="box-shadow-all-light">
      <section id="allergie-card" >
    		<section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-allergie">Edit</a></li>
              <br>
              <li><a href="#" id="delete-allergie" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 id="field-info">Allergic to</h4>
          <p id="allergie-name">${saveAllergieDataObj.allergicto}</p>
        </section>
			</section>   
    </div></div>`)

    // Display the menu elipse for each card/allergieId

    $(`#${allergieId} #menu-elipse`).click(function() {
      $(`#${allergieId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific Allergie Data Stored 

    $(`#${allergieId} #edit-allergie`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-allergie-id').val(allergieId);
      $('#edit-allergie-name').val(saveAllergieDataObj.allergicto);

      $('#imgPop').addClass("display-none");
    
    });	


    // Delete card for a specific allergie entry

    $(`#${allergieId} #delete-allergie`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-allergie-id').val(allergieId);
      $('#delete-allergie-name').val(saveAllergieDataObj.allergicto);

      $('#imgPop').addClass("display-none");
    });

    // Delete allergie from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).on('child_removed', function(data){
      $(`#${allergieId}`).remove();
    });
  }); //End of function "on child_added"


	// Edit Allergie Button Submition Action from Edit Allergie Screen
  $('#edit-allergie-btn').click(function(){
    var editAllergieData = {
      allergicto: $('#edit-allergie-name').val()
    }
    var allergieId = $('#edit-allergie-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).set(editAllergieData);
    
    window.location.replace("./allergie.html");
  });

  // Delete Allergie Button Submition Action from Edit Allergie Screen

  $(`#delete-allergie-btn`).click(function(){
    var allergieId = $('#delete-allergie-id').val();
    console.log(allergieId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/allergies/" + allergieId).remove();
    
    window.location.replace("./allergie.html");
    });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./allergie.html");
  });


  // Add Allergie from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Allergie Entry from Elipse Menu

  $('#edit-allergie').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");


  });

  // Display Delete Allergie Card after Choosing Entry from Elipse Menu

  $('#delete-allergie').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });



  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE ALLERGIES SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addAllergie').removeClass("display-none");
  }); 

  $("#addAllergie").click(function(){
    $("#addAllergie").addClass("display-none");

  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editAllergie').removeClass("display-none");
  }); 

  $("#editAllergie").click(function(){
    $("#editAllergie").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteAllergie').removeClass("display-none");
  }); 

  $("#deleteAllergie").click(function(){
    $("#deleteAllergie").addClass("display-none");
  });

};