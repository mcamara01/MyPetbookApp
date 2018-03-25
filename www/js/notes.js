// NOTES PAGE JS
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
    
    // Save Note Data Button from New Note Screen

    $('#save-note-btn').click(function(){
        var saveNoteData = {
            title: $('#new-note-title').val(),  
            date: $('#new-note-date').val(),
            text: $('#new-note-text').val(), 
    }

    // code to create an note id on database
    var noteId = firebase.database().ref().child('users/pet/notes').push().key;

  // path to set the note key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).set(saveNoteData);

    // return to main notes page
  window.location.replace("./notes.html");
});

    const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add note related to a pet into Firebase

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/").on('child_added', function(data){
  
    const noteId = data.key;
    const saveNoteDataObj = data.val();

    $('#load-card').prepend(`<div id="${noteId}"><div id="card" class="box-shadow-all-light">
      <section id="note-card" >
        <section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-note">Edit</a></li>
              <br>
              <li><a href="#" id="delete-note" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>

          <h4 id="note-title" id="field-title">${saveNoteDataObj.title}</h4>
          <p id="note-date">${saveNoteDataObj.date}</p>
          <p id="note-text">${saveNoteDataObj.text}</p>
        </section>
            </section>   
    </div></div>`)

    // Display the menu elipse for each card/noteId

    $(`#${noteId} #menu-elipse`).click(function() {
      $(`#${noteId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific Note Data Stored 

    $(`#${noteId} #edit-note`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-note-id').val(noteId);
      $('#edit-note-title').val(saveNoteDataObj.title);
      $('#edit-note-date').val(saveNoteDataObj.date);
      $('#edit-note-text').val(saveNoteDataObj.text);

      $('#imgPop').addClass("display-none");
    
    }); 


    // Delete card for a specific Note entry

    $(`#${noteId} #delete-note`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-note-id').val(noteId);
      $('#delete-note-title').val(saveNoteDataObj.title);
      $('#delete-note-date').val(saveNoteDataObj.date);
      $('#delete-note-text').val(saveNoteDataObj.text);;

      $('#imgPop').addClass("display-none");
    });

    // Delete Note from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).on('child_removed', function(data){
      $(`#${noteId}`).remove();
    });
  }); //End of function "on child_added"


    // Edit Note Button Submition Action from Edit Note Screen
  $('#edit-note-btn').click(function(){
    var editNoteData = {
      title: $('#edit-note-title').val(),  
      date: $('#edit-note-date').val(),
      text: $('#edit-note-text').val(),
    }
    var noteId = $('#edit-note-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).set(editNoteData);
    
    window.location.replace("./notes.html");
  });

  // Delete Note Button Submition Action from Edit Note Screen

  $(`#delete-note-btn`).click(function(){
    var noteId = $('#delete-note-id').val();
    console.log(noteId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).remove();
    
    window.location.replace("./notes.html");
    });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./notes.html");
  });


  // Add Note from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Note Entry from Elipse Menu

  $('#edit-note').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");


  });

  // Display Delete Note Card after Choosing Entry from Elipse Menu

  $('#delete-note').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });



  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE ALLERGIES SCREEN

  // Save Info popup

  $('#save-info').click(function(){
  $('#addNote').removeClass("display-none");
  }); 

  $("#addNote").click(function(){
    $("#addNote").addClass("display-none");

  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editNote').removeClass("display-none");
  }); 

  $("#editNote").click(function(){
    $("#editNote").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteNote').removeClass("display-none");
  }); 

  $("#deleteNote").click(function(){
    $("#deleteNote").addClass("display-none");
  });

};