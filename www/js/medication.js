// MEDICATION PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeMedication = false;

function onDeviceReady() {

  if (initializeMedication) {
    return
  } else {
    initializeMedication = true;
  }

  // Save Medication Data Button from New Medication Screen

  $('#save-medication-btn').click(function(){
    var saveMedicationData = {
      name: $('#new-medication-name').val(),
      date: $('#new-medication-date').val(),
      expiration: $('#new-medication-expiration').val(),
    }

    // code to create a medication id on database
    var medicationId = firebase.database().ref().child('users/pet/medications').push().key;


    // path to set the data on Firebase
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/medications/" + medicationId).set(saveMedicationData);

    // return to main medication page
    window.location.replace("./medication.html");
  });

  const users = firebase.database().ref('/users');


  // FUNCTION CHILD ADDED - Add medication related to a pet into Firebase

  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/medications/").on('child_added', function(data){

    const medicationId = data.key;
    const saveMedicationDataObj = data.val();

    $('#load-card').prepend(`<div id="${medicationId}"><div id="card" class="box-shadow-all-light">
      <section id="medication-card" >
        <section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-medication">Edit</a></li>
              <li><a href="#" id="medication-calendar">Add Alert</a></li>
              <br>
              <br>
              <li><a href="#" id="delete-medication" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 id="medication-name" class=" field-info field-name">${saveMedicationDataObj.name}</h4>
          <h4 class="field-info">Date Taken</h4>
          <p id="medication-date" class="field-response">${saveMedicationDataObj.date}</p>
          <h4 class="field-info">Expiration Date</h4>
          <p id="medication-expiration" class="field-response">${saveMedicationDataObj.expiration}</p>
        </section>
      </section>
    </div></div>`)


    // Display the menu elipse for each card/medicationId

    $(`#${medicationId} #menu-elipse`).click(function() {
      $(`#${medicationId} #elipse-options-nav`).slideToggle("slow");
    });


    // Edit a specific Medication Data Stored

    $(`#${medicationId} #edit-medication`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-medication-id').val(medicationId);
      $('#edit-medication-name').val(saveMedicationDataObj.name);
      $('#edit-medication-date').val(saveMedicationDataObj.date);
      $('#edit-medication-expiration').val(saveMedicationDataObj.expiration);

      $('#imgPop').addClass("display-none");
    });

    // Delete card for a specific medication entry

    $(`#${medicationId} #delete-medication`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-medication-id').val(medicationId);
      $('#delete-medication-name').val(saveMedicationDataObj.name);
      $('#delete-medication-date').val(saveMedicationDataObj.date);
      $('#delete-medication-expiration').val(saveMedicationDataObj.expiration);

      $('#imgPop').addClass("display-none");
    });

    // Delete a specific medication entry

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/medications/" + medicationId).on('child_removed', function(data){
      $(`#${medicationId}`).remove();
    });

  }); //End of function "on child_added"


  // Edit Medication Button Submition Action from Edit Medication Screen
  $('#edit-medication-btn').click(function(){
    var editMedicationData = {
      name: $('#edit-medication-name').val(),
      date: $('#edit-medication-date').val(),
      expiration: $('#edit-medication-expiration').val(),
    }
    var medicationId = $('#edit-medication-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/medications/" + medicationId).set(editMedicationData);

    window.location.replace("./medication.html");
  });

  // Delete Medication Button Submition Action from Edit Medication Screen
  $('#delete-medication-btn').click(function(){
    var medicationId = $('#delete-medication-id').val();
    console.log(medicationId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/medications/" + medicationId).remove();

    window.location.replace("./medication.html");
  });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./medication.html");
    });

  // Add Medication from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Medication Entry from Elipse Menu

  $('#edit-medication').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Medication Card after Choosing Entry from Elipse Menu

  $('#delete-medication').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE MEDICATION SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addMedication').removeClass("display-none");
  });

  $("#addMedication").click(function(){
    $("#addMedication").addClass("display-none");
  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editMedication').removeClass("display-none");
  });

  $("#editMedication").click(function(){
    $("#editMedication").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteMedication').removeClass("display-none");
  });

  $("#deleteMedication").click(function(){
    $("#deleteMedication").addClass("display-none");
  });


};
