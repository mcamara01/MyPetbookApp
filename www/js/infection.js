// INFECTIONS PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeInfection = false;

function onDeviceReady() {

  if (initializeInfection) {
    return
  } else {
    initializeInfection = true;
  }

	// Save Infection Data Button from New Infection Screen

	$('#save-infection-btn').click(function(){
		var saveInfectionData = {
			type: $('#new-infection-name').val(),
    }

	// code to create an infection id on database
	var infectionId = firebase.database().ref().child('users/pet/infections').push().key;

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/infections/" + infectionId).set(saveInfectionData);

	// return to main infection page
  window.location.replace("./infections.html");
});

	const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add infection related to a pet into Firebase

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/infections/").on('child_added', function(data){

    const infectionId = data.key;
    const saveInfectionDataObj = data.val();

    $('#load-card').prepend(`<div id="${infectionId}"><div id="card" class="box-shadow-all-light">
      <section id="infection-card" >
    		<section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-infection">Edit</a></li>
              <br>
              <li><a href="#" id="delete-infection" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 class="field-info">Type</h4>
          <p id="infection-name" class="field-response">${saveInfectionDataObj.type}</p>
        </section>
			</section>
    </div></div>`)

    // Display the menu elipse for each card/infectionId

    $(`#${infectionId} #menu-elipse`).click(function() {
      $(`#${infectionId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific Infection Data Stored

    $(`#${infectionId} #edit-infection`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-infection-id').val(infectionId);
      $('#edit-infection-name').val(saveInfectionDataObj.type);

      $('#imgPop').addClass("display-none");

    });


    // Delete card for a specific infection entry

    $(`#${infectionId} #delete-infection`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-infection-id').val(infectionId);
      $('#delete-infection-name').val(saveInfectionDataObj.type);

      $('#imgPop').addClass("display-none");
    });

    // Delete infection from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/infections/" + infectionId).on('child_removed', function(data){
      $(`#${infectionId}`).remove();
    });
  }); //End of function "on child_added"


	// Edit Infection Button Submition Action from Edit Infections Screen
  $('#edit-infection-btn').click(function(){
    var editInfectionData = {
      type: $('#edit-infection-name').val()
    }
    var infectionId = $('#edit-infection-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/infections/" + infectionId).set(editInfectionData);

    window.location.replace("./infections.html");
  });

  // Delete Infection Button Submition Action from Edit Infection Screen
  $('#delete-infection-btn').click(function(){
    var infectionId = $('#delete-infection-id').val();
    console.log(infectionId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/infections/" + infectionId).remove();

    window.location.replace("./infections.html");
  });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./infections.html");
    });

  // Add Infection from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Infection Entry from Elipse Menu

  $('#edit-infection').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Infection Card after Choosing Entry from Elipse Menu

  $('#delete-infection').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE INFECTIONS SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addInfection').removeClass("display-none");
  });

  $("#addInfection").click(function(){
    $("#addInfection").addClass("display-none");
  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editInfection').removeClass("display-none");
  });

  $("#editInfection").click(function(){
    $("#editInfection").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteInfection').removeClass("display-none");
  });

  $("#deleteInfection").click(function(){
    $("#deleteInfection").addClass("display-none");
  });


};
