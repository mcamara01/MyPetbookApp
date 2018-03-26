
document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeLogin = false;


function onDeviceReady() {

	if (initializeLogin) {
		return 
	} else {
		initializeLogin = true;
	}

	$('#loginButton').click(function(){
		console.log("dracarys");
		var email = $('#userEmail').val();
		var password = $('#userPassword').val();
		console.log(email);
		console.log(password);

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  

		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		}).then(function(result){
			console.log(result);
			// code to get user uid from auth
		    var userKey = result.uid;

		    console.log(userKey);

		    const userData = {
		      
		        name: result.email,

		    }

		    console.log(userData);
		    // set userKey to Local Storage
		    localStorage.setItem('userKey', userKey);

		    // path to set the user key data to Firebase
		    firebase.database().ref('users/' + userKey).update(userData).then(function(){

			    // direct user when successfull loged in to index page
				window.location.replace("./index.html");

		    });
  
  
			
		});
		
		
	});
};