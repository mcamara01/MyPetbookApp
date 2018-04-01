// ADD PET PAGE JS
  //----------------------------------------------------------------------

document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeAddPet = false;


function onDeviceReady() {

  if (initializeAddPet) {
    return
  } else {
    initializeAddPet = true;
  }

 //Get the user key from LocalStorage if there's one
  userKey = localStorage.getItem('userKey');

  $('#save-pet-btn').click(function() {
    var savePetData = {
      name: $('#new-pet-name').val(),
      dob: $('#new-pet-dob').val(),
      gender: $('input[name=gender]:checked').val(),
      color: $('#new-pet-color').val(),
      weight: $('#new-pet-weight').val(),
      image: $('#pet-photo').attr('src')
    };

    // code to create a pet id on database
    var petKey = firebase.database().ref().child('users/pet').push().key;


    //path to set the data on Firebase
    firebase.database().ref('users/' + userKey + "/pet/" +  petKey + "/general/").set(savePetData);

    //return to main vaccination page after adding pet
    window.location.replace("./index.html");

  }); //end save pet button click function

  //get user reference
  const users = firebase.database().ref('/users');
  // console.log("users " + firebase.database().ref('/users/pets/'));

  // using the keys previously created to assign pet info
  // const userKey = "-L7x4ZVLBHYi3KgQIjWa"; //with pets
  // const userKey = "-L84JpdyM8n31t3z9x1b"; //without pets

  let petDataPath = firebase.database().ref('users/' + userKey + "/pet/");

  // If there are no pets ==================================================================
  petDataPath.on('value', function(e){
    if(e.val() == null) {
      console.log("no pets");
      //show no pets divs
      $('#no-pet-main-info').removeClass("display-none");

      //remove initial pet img div
      $('#pet-loading').addClass("display-none");

      //remove loading div when pets Loaded
      $('#loading').addClass("display-none");
    }
  });



  // IF CHILD ADDED - Add pet related to user into Firebase and HTML ================================
  petDataPath.on('child_added', function(data) {

    // console.log("has pets data " , data);
    const petKey = data.key;
    const savePetDataObj = data.val();

    // Show pet added card on HTML ===================================================
    $('#load-pet').prepend(`<div class="slideshow-container"><div id="${petKey}" class="mySlides fade"><div id="card" class="pet-info">
        <!-- Pet Header -->
        <section id="pet-main-info">
          <div id="icon-pet-photo"></div>
          <div id="pet-intro">
            <h3>${savePetDataObj.general.name}</h3>
            <p id="pet-age" class="subtitle"></p>
          </div>
        </section>

        <section id="pet-content" class="box-shadow-bottom-light">
          <div id="main-pet-photo"></div>
          <nav>
            <ul>
              <li id="delete-pet"><img src="icons/icon_trash.png" alt="delete pet" /></li>
              <li id="icon-info"><a href="pet-profile.html"><img src="icons/icon_view.png" alt="view pet info"></a></li>
            </ul>
          </nav>
        </section>

        <!-- Next and previous buttons -->
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>

      </div><!-- END OF PET INFO -->
    </div>

    <!-- The delete pet popup -->
    <div id="deletePet-popup" class="popup display-none">
      <!-- popup content -->
      <div class="popup-content box-shadow-all-light">
        <h2>Delete</h2>
        <p>Are you sure you want to delete this pet?
        <div class="options-align">
          <button id="delete-cancel-entry" class="cancel">CANCEL</button>
          <button id="delete-pet-btn" class="submit">DELETE</button>
        </div>
      </div>
    </div>

    </div></div>`)



    //remove loading div when pets Loaded
    $('#loading').addClass("display-none");

    // get the image added and make it a bg of icon img div
    var imageSrc = savePetDataObj.general.image;
    $('#icon-pet-photo').css('background-image', 'url(' + imageSrc + ')');

    // get the image added and make it a bg of main img div
    var imageSrc = savePetDataObj.general.image;
    $('#main-pet-photo').css('background-image', 'url(' + imageSrc + ')');

    // get the dob added and calculate age
    var dobAdded = savePetDataObj.general.dob;
    var petAge = getAge(dobAdded);
    // console.log(getAge(dobAdded));

    // set petId into local Storage
    $(`#${petKey} #icon-info`).click(function(){
      localStorage.setItem("petKey", petKey);
      localStorage.setItem("petAge", petAge);
      localStorage.setItem("petName", savePetDataObj.general.name);
      localStorage.setItem("imageSrc", savePetDataObj.general.image);
    })

    //show age calculated on html
    $('#pet-age').html(petAge);

    //function to calculate pet age
    function getAge(dateString) {
      var now = new Date();

      var yearNow = now.getFullYear();
      var monthNow = now.getMonth()+1; //starts from 0
      var dateNow = now.getDate();

      var dob = new Date(dateString.substring(0,4),
                         dateString.substring(5,7),
                         dateString.substring(8,10)
                         );

      var yearDob = dob.getFullYear();
      var monthDob = dob.getMonth();
      var dateDob = dob.getDate();
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
      else if ( (age.years > 0) && (age.months == 0) )
        ageString = age.years + yearString +". Happy Birthday ${savePetDataObj.general.name}!!";
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

    //remove add pet card and show added pets
    $("#no-pet-main-info").addClass("display-none");
    $("#pet-loading").addClass("display-none");
    $('#load-pet').removeClass("display-none");

    // show delete pet Popup - inside because this button is added later
    $('#delete-pet').click(function() {
      console.log("clicked delete");
      $('#deletePet-popup').removeClass("display-none");
    });

    $('#delete-cancel-entry').click(function() {
      window.location.replace("./index.html");
    });

    // Delete pet =====================================================================
    $(`#delete-pet-btn`).click(function(event) {
      console.log("inside delete from db");
      firebase.database().ref('users/' + userKey + "/pet/" +  petKey).remove();
      window.location.replace("./index.html");

    });

    firebase.database().ref('users/' + userKey + "/pet/" +  petKey).on('child_removed', function(data) {
      console.log("inside delete from html");
      $(`#${petKey}`).remove();
      $('#deletePet-popup').addClass("display-none");
    });


    //DISPLAY SLIDES function ==============================================================
    showSlides(slideIndex);

  }); //End of function "on child_added"


  // Add Pet from Add Button on Bottom Screen ==========================================================
  $('.add-new-button').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");
    $("#menu-title").html("<h1>New Pet</h1>");
    $(".add-new-button").addClass("display-none");
  });

  // Go to second step to add photo
  $('#next-step').click(function(){
    $("#add-pet-step-1").addClass("display-none");
    $('#add-pet-step-2').removeClass("display-none");
    $(".add-new-button").addClass("display-none");

  });


  // POPUPS FOR SAVE BUTTON ON NEW AND DELETE PET SCREEN =================================

  // Save Info popup
  // $('#save-info').click(function() {
  //   $('#addPet-popup').removeClass("display-none");
  // });
  //
  // $("#addPet-popup").click(function() {
  //   $("#addPet-popup").addClass("display-none");
  // });

  // Cancel adding pet
  $('#cancel-entry').click(function() {
    window.location.replace("./index.html");
  });

  // confirm delete pet inside popup
  $("#deletePet-popup").click(function() { //this part of popup is outside child added because button already exists
    $("#deletePet-popup").addClass("display-none");
  });




}; // end on device ready

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

//SLIDES DISPLAY FUNCTIONS =======================================================

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
