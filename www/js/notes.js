// VACCINATION PAGE JS
  //---------------------------------------------------------------------- 

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeNotes = false;


function onDeviceReady() {

  if (initializeNotes) {
    return 
  } else {
    initializeNotes = true;
  }

// $("#editIcon").on('click','img',function(){
  //  $("#firstLower").css('display','block');
  // })

 $('#saveNote').click(function(){
    var saveNoteData = {
      name: $('#noteTitle').val(),
      date: $('#noteDate').val(),
      memo: $('#note').val()
    }


  var noteId = firebase.database().ref().child('users/pet/notes').push().key;
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).set(saveNoteData);

    // return to main vaccination page
    window.location.replace("./notes.html");
});

  const users = firebase.database().ref('/users');



  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/").on('child_added', function(data){
    const noteId = data.key;
    const saveNoteDataObj = data.val();

    $('#new').prepend(`
            <div id="${noteId}"><div id = "card3">
             <section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-note">Edit</a></li>
              <li><a href="#" id="note-calendar">Add Alert</a></li>
              <br>
              <br>
              <li><a href="#" id="delete-note" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>
            <p id="newTitle">${saveNoteDataObj.name}</p>
            <p id="newDate">${saveNoteDataObj.date}</p>
            <p id="newMemo">${saveNoteDataObj.memo}</p>
            </div></div>`)

    $(`#${noteId} #edit-note`).click(function(){
      $("#firstLower").removeClass("display-none");
      $("#lowerBody").addClass("display-none");
      $('#noteTitle').val(saveNoteDataObj.name);
      $('#noteDate').val(saveNoteDataObj.date);  
      $('#note').val(saveNoteDataObj.memo);
      firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).remove();
      firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).on('child_removed', function(data){
      $(`#${noteId}`).remove();
    });

    });

     $(`#${noteId} #menu-elipse`).click(function() {
      $(`#${noteId} #elipse-options-nav`).slideToggle("slow");
    });

     $(`#${noteId} #delete-note`).click(function(event){
      $(`#${noteId} #elipse-options-nav`).slideUp("slow");
      $('#deleteNote').removeClass('display-none');
       $('#deleteNote').click(function(){
      
       firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).on('child_removed', function(data){
        $(`#${noteId}`).remove();
        });
       window.location.replace("./notes.html");
     });

      });
    
  });

  $(`#delete-note-btn`).click(function(){
    var noteId = $('#delete-note-id').val();
    console.log(noteId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/notes/" + noteId).remove();
    
    window.location.replace("./notes.html");
    });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./notes.html");
  });



  $('#addNoteIcon').click(function(){
    $('#firstLower').removeClass('display-none');
    $('#lowerBody').addClass('display-none');
  });

 

};








