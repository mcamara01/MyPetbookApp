    //----------------------
    // MAIN JAVASCRIPT CODE

    document.addEventListener("deviceready", onDeviceReady, false);
    $(document).ready(onDeviceReady);

    var initialize = false;

    //Get the user data from LocalStorage if there's one 
    var userKey;

    //Get the petId from LocalStorage if there's one 
    var petKey;

    var petName;

    var petAge;

    var imageSrc;


    function onDeviceReady() {
      if (initialize) {
        return 
      } else {
        initialize = true;
      }


      //Get the petId from LocalStorage if there's one 
      userKey = localStorage.getItem('userKey');

      //Get the petId from LocalStorage if there's one 
      petKey = localStorage.getItem('petKey');

      //Get the petId from LocalStorage if there's one 
      petName = localStorage.getItem('petName');
      $('#header-pet-name').html(petName);

      //Get the petId from LocalStorage if there's one 
      petAge= localStorage.getItem('petAge');
      $('#pet-age').html(petAge);

      imageSrc = localStorage.getItem('imageSrc');
      $('#icon-pet-photo').css('background-image', 'url(' + imageSrc + ')');


      //----------------------
      // Initialize Firebase

      var config = {
        apiKey: "AIzaSyDyRm3-_rS5aGpattuN-cT3VfxhtYirTfk",
        authDomain: "mypetbookapp-4d393.firebaseapp.com",
        databaseURL: "https://mypetbookapp-4d393.firebaseio.com",
        projectId: "mypetbookapp-4d393",
        storageBucket: "mypetbookapp-4d393.appspot.com",
        messagingSenderId: "353025423183"
      };
      firebase.initializeApp(config);


      // top options nav open window
      $('#menu-hamb').click(function() {
        $('#top-options-nav').slideToggle("slow");
      });

       // ELIPSE MENU OPTIONS

      $('#menu-elipse').click(function() {
        $('#card #elipse-options-nav').stop(true).slideToggle("slow");
     
      });
      // hide element when click anywhere in the body screen
      $(document).click(function (e) {
        if (!$(e.target).closest('#menu-elipse, #elipse-options-nav').length > 0) {
            $('#card #elipse-options-nav').stop(true).slideUp();
        }
      });

      // --------------------------


      firebase.auth().onAuthStateChanged(function(user) {

        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            // -1 means not in that path page
            if (window.location.pathname.search("login.html") != -1) { 


              window.location.replace("./index.html");
            }
          } else {
            // No user is signed in.
            if (window.location.pathname.search("createAccount.html") != -1) {    

              return

            } else if (window.location.pathname.search("login.html") == -1) {    

              window.location.replace("./login.html");  
            }
          }
        });


      $('#signout').click(function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        }).then(function(){
          // direct user to login page
          window.location.replace("./login.html");
        });


      });

      $('#calendar').click(function(){

        // Prepare some variables used below
        var cal = window.plugins.calendar;

        // opening the calendar 
        // to open the calendar app at 'today'
        cal.openCalendar();
      });


  };



