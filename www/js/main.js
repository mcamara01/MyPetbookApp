    //----------------------
    // MAIN JAVASCRIPT CODE

    document.addEventListener("deviceready", onDeviceReady, false);
    $(document).ready(onDeviceReady);

    var initialize = false;

    //Get the user key from LocalStorage if there's one 
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
        $('#elipse-options-nav').slideToggle("slow");
    });

      // --------------------------
    



    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // User is signed in.
            // -1 means not in that path page
            if (window.location.pathname.search("login.html") != -1) { 
                
                userSetup(user);
                // window.location.replace("./index.html");
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


};


function userSetup (user){

      // code to get user uid from auth
      var userKey = user.uid;

      const userData = {

        email: user.email,

      }
        // set userKey to Local Storage
        localStorage.setItem('userKey', userKey);

        // path to set the user key data to Firebase
        firebase.database().ref('users/' + userKey).update(userData).then(function(){

          // direct user when successfull loged in to index page
          window.location.replace("./index.html");

        });



     //    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
     //    .then(function() {

     //     console.log("check if passes here")
      //     // Existing and future Auth states are now persisted in the current
      //     // session only. Closing the window would clear any existing state even
      //     // if a user forgets to sign out.
      //     // ...
      //     // New sign-in will be persisted with session persistence.
      //     return firebase.auth().signInWithEmailAndPassword(email, password);
      // })
     //    .catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      // });



    };
