
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
		var email = $('#userEmail').val();
		var password = $('#userPassword').val();
	

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  var friendlyErrorMessage;

		  // friendly error message for user

		  if (errorCode == 'auth/wrong-password') {
		  	friendlyErrorMessage = "Username or password is incorrect.";
		  } else if ( errorCode == 'auth/user-not-found') {
		  	friendlyErrorMessage = "Username or password is incorrect.";
		  } else {
		  	friendlyErrorMessage = errorMessage;
		  }

		  console.log(friendlyErrorMessage);

		  // append popup with error message
		  $('#errorMessage').removeClass("display-none").prepend(`<div class="popup-content box-shadow-all-light">
		  	<p> Sorry!  
		  	<br>
		  	<p> ${friendlyErrorMessage} 
		  	<br>
		  	<p>Please, try it again.
		  	<div class="options-align">
		  	<button id="ok-btn" class="submit">OK</button>
		  	</div>
		  	</div>`);

		  $('#ok-btn').click(function(){
		  	$("#errorMessage").addClass("display-none");
		  		// direct user when successfull logged in to login page
		  		window.location.replace("./login.html");
		  	});

		  console.log(errorMessage);
		  console.log(errorCode);

		}).then(function(user){
					
			if (user) {
				// set userKey to Local Storage
	        	localStorage.setItem('userKey', user.uid);

				window.location.replace("./index.html");
			}


		});
		

	});


};