// VETERINARY PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeVeterinary = false;

function onDeviceReady() {

  if (initializeVeterinary) {
    return
  } else {
    initializeVeterinary = true;
  }

  // Save Veterinary Data Button from New Veterinary Screen

  $('#save-veterinary-btn').click(function(){
    var saveVeterinaryData = {
      name: $('#new-veterinary-name').val(),
      // phone: $('#new-veterinary-phone').val(),
      address: $('#new-veterinary-address').val(),
      date: $('#new-veterinary-date').val()
    }

  // code to create an veterinary id on database
  var veterinaryId = firebase.database().ref().child('users/pet/veterinary').push().key;

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/veterinary/" + veterinaryId).set(saveVeterinaryData);

  // return to main veterinary page
  window.location.replace("./veterinary.html");
});

  const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add veterinary related to a pet into Firebase

  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/veterinary/").on('child_added', function(data){

    const veterinaryId = data.key;
    const saveVeterinaryDataObj = data.val();

    $('#load-card').prepend(`<div id="${veterinaryId}"><div id="card" class="box-shadow-all-light">
      <section id="veterinary-card" >
        <section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-veterinary">Edit</a></li>
              <li><a href="#" id="veterinary-calendar">Add Alert</a></li>
              <br>
              <br>
              <li><a href="#" id="delete-veterinary" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>
        <section>
          <h4 class="field-info">Name</h4>
          <p id="veterinary-name" class="field-response">${saveVeterinaryDataObj.name}</p>
          <!--<h4 class="field-info">Phone</h4>
          <p id="veterinary-phone">${saveVeterinaryDataObj.phone}</p>-->
          <h4 class="field-info">Address</h4>
          <p id="veterinary-address">${saveVeterinaryDataObj.address}</p>
          <h4 class="field-info">Apointment Date</h4>
          <p id="veterinary-date" class="field-response">${saveVeterinaryDataObj.date}</p>
        </section>
      </section>
    </div></div>`)

    // Display the menu elipse for each card/veterinaryId

    $(`#${veterinaryId} #menu-elipse`).click(function() {
      $(`#${veterinaryId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific Veterinary Data Stored

    $(`#${veterinaryId} #edit-veterinary`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-veterinary-id').val(veterinaryId);
      $('#edit-veterinary-name').val(saveVeterinaryDataObj.name);
      // $('#edit-veterinary-phone').val(saveVeterinaryDataObj.phone);
      $('#edit-veterinary-address').val(saveVeterinaryDataObj.address);
      $('#edit-veterinary-date').val(saveVeterinaryDataObj.date);

      $('#imgPop').addClass("display-none");

    });


    // Delete card for a specific Veterinary entry

    $(`#${veterinaryId} #delete-veterinary`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-veterinary-id').val(veterinaryId);
      $('#delete-veterinary-name').val(saveVeterinaryDataObj.name);
      // $('#delete-veterinary-phone').val(saveVeterinaryDataObj.phone);
      $('#delete-veterinary-address').val(saveVeterinaryDataObj.address);
      $('#delete-veterinary-date').val(saveVeterinaryDataObj.date);

      $('#imgPop').addClass("display-none");

    });

    // Delete veterinary from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/veterinary/" + veterinaryId).on('child_removed', function(data){
      $(`#${veterinaryId}`).remove();
    });


    // Calendar for Veterinary Apointment Events
    $(`#${veterinaryId} #veterinary-calendar`).click(function(){

        var cal = window.plugins.calendar;
        var title = saveVeterinaryDataObj.name;
        var eventLocation = saveVeterinaryDataObj.address;
        var start = new Date (saveVeterinaryDataObj.date + 'T00:00:00-07:00');
        var end = new Date (saveVeterinaryDataObj.date);

        cal.createEventInteractively(title, eventLocation, '', start, end);

    });

  }); //End of function "on child_added"


  // Edit Veterinary Button Submition Action from Edit Veterinary Screen
  $('#edit-veterinary-btn').click(function(){
    var editVeterinaryData = {
      name: $('#edit-veterinary-name').val(),
      // phone: $('#edit-veterinary-phone').val(),
      address: $('#edit-veterinary-address').val(),
      date: $('#edit-veterinary-date').val()
    }
    var veterinaryId = $('#edit-veterinary-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/veterinary/" + veterinaryId).set(editVeterinaryData);

    window.location.replace("./veterinary.html");
  });

  // Delete Veterinary Button Submition Action from Edit Veterinary Screen
  $('#delete-veterinary-btn').click(function(){
    var veterinaryId = $('#delete-veterinary-id').val();
    console.log(veterinaryId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/veterinary/" + veterinaryId).remove();

    window.location.replace("./veterinary.html");
  });

   $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./veterinary.html");
  });

  // Add Veterinary from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Veterinary Entry from Elipse Menu

  $('#edit-veterinary').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Veterinary Card after Choosing Entry from Elipse Menu

  $('#delete-veterinary').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE VETERINARY SCREEN

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editVeterinary').removeClass("display-none");
  });

  $("#editVeterinary").click(function(){
    $("#editVeterinary").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteVeterinary').removeClass("display-none");
  });

  $("#deleteVeterinary").click(function(){
    $("#deleteVeterinary").addClass("display-none");
  });


};