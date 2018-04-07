
document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeLogin = false;


function onDeviceReady() {

	if (initializeLogin) {
		return 
	} else {
		initializeLogin = true;
	}

	function popupError(friendlyErrorMessage) {
		// display popup with error message
		
		$('#errorMessage').removeClass("display-none");
		$('#displayMessage').text(friendlyErrorMessage); 

		$('#ok-btn').click(function(){
			$("#errorMessage").addClass("display-none");
		  	});

	};
	

	$('#btnSignUp').click(function(){
		if(document.getElementById('checkBox').checked){
		// added username var
		var name = $('#username').val();
		var email = $('#txtEmail').val();
		var password = $('#pass1').val();
		var password2 = $('#pass2').val();
		if (password != password2) {
			popupError("Passwords don't match."); 
			return
		}

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;

		  // friendly error message for user
		  var friendlyErrorMessage;

		  if (errorCode == 'auth/invalid-email') {
		  	friendlyErrorMessage = "You have entered an invalid email address.";
		  } else {
		  	friendlyErrorMessage = errorMessage;
		  }

		  popupError(friendlyErrorMessage);
		  

		  // ...
		}).then(function(){
			
			var user = firebase.auth().currentUser;

			if (!user) {
				return
			}

			// code to get user uid from auth
			var userKey = user.uid;


			const userData = {
				name: name,
				email: user.email,
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

		} else {
			alert("Please, make sure to check our terms and conditions.")
		}
	});

};