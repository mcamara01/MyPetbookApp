// EXAMS PAGE JS
//----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeExam = false;

function onDeviceReady() {

  if (initializeExam) {
    return
  } else {
    initializeExam = true;
  }

	// Save Exam Data Button from New Exam Screen

	$('#save-exam-btn').click(function(){
		var saveExamData = {
			name: $('#new-exam-name').val(),
      date: $('#new-exam-date').val()
    }

    if($('#new-exam-name').val() == '' || $('#new-exam-date').val() == ''){
     alert('Sorry! Seems like there is an empty field.')
        } else {
	// code to create an exam id on database
	var examId = firebase.database().ref().child('users/pet/exams').push().key;

  // path to set the user key data to Firebase
  firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/exams/" + examId).set(saveExamData);

	// return to main exam page
  window.location.replace("./exams.html");
  }
});

	const users = firebase.database().ref('/users');

  // FUNCTION CHILD ADDED - Add exam related to a pet into Firebase

	firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/exams/").on('child_added', function(data){

    const examId = data.key;
    const saveExamDataObj = data.val();

    $('#load-card').prepend(`<div id="${examId}"><div id="card" class="box-shadow-all-light">
      <section id="exam-card" >
    		<section>
          <span id="menu-elipse"><a href="#">...</a></span>
          <!-- options elipse nav -->
          <nav id="elipse-options-nav" class="box-shadow-bottom-dark display-none">
            <ul>
              <li><a href="#" id="edit-exam">Edit</a></li>
              <br>
              <li><a href="#" id="delete-exam" class="delete-option">Delete</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <h4 class="field-info">Exam Type</h4>
          <p id="exam-name" class="field-response">${saveExamDataObj.name}</p>
          <h4 class="field-info">Date Taken</h4>
          <p id="exam-date" class="field-response">${saveExamDataObj.date}</p>
        </section>
			</section>
    </div></div>`)

    // Display the menu elipse for each card/examId

    $(`#${examId} #menu-elipse`).click(function() {
      $(`#${examId} #elipse-options-nav`).slideToggle("slow");
    });

    // Edit card for a specific Exam Data Stored

    $(`#${examId} #edit-exam`).click(function(){
      $("#edit-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#edit-exam-id').val(examId);
      $('#edit-exam-name').val(saveExamDataObj.name);
      $('#edit-exam-date').val(saveExamDataObj.date);

      $('#imgPop').addClass("display-none");

    });


    // Delete card for a specific Exam entry

    $(`#${examId} #delete-exam`).click(function(){
      $("#delete-card").removeClass("display-none");
      $("#load-card").addClass("display-none");

      $('#delete-exam-id').val(examId);
      $('#delete-exam-name').val(saveExamDataObj.name);
      $('#delete-exam-date').val(saveExamDataObj.date);

      $('#imgPop').addClass("display-none");

    });

    // Delete Exam from database

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/exams/" + examId).on('child_removed', function(data){
      $(`#${examId}`).remove();
    });
  }); //End of function "on child_added"


	// Edit Exam Button Submition Action from Edit Exam Screen
  $('#edit-exam-btn').click(function(){
    var editExamData = {
      name: $('#edit-exam-name').val(),
      date: $('#edit-exam-date').val()
    }
    var examId = $('#edit-exam-id').val();

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/exams/" + examId).set(editExamData);

    window.location.replace("./exams.html");
  });

  // Delete Exam Button Submition Action from Edit Exam Screen
  $('#delete-exam-btn').click(function(){
    var examId = $('#delete-exam-id').val();
    console.log(examId);
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/exams/" + examId).remove();

    window.location.replace("./exams.html");
  });

  $(`#delete-cancel-entry`).click(function(){
    window.location.replace("./exams.html");
    });

  // Add Exam from Add Button on Bottom Screen

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $('#imgPop').addClass("display-none");

  });

  // Display Edit Card after Choosing Edit Exam Entry from Elipse Menu

  $('#edit-exam').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Display Delete Exam Card after Choosing Entry from Elipse Menu

  $('#delete-exam').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW, EDIT AND DELETE EXAMS SCREEN

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editExam').removeClass("display-none");
  });

  $("#editExam").click(function(){
    $("#editExam").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteExam').removeClass("display-none");
  });

  $("#deleteExam").click(function(){
    $("#deleteExam").addClass("display-none");
  });


};
