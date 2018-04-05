
document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeLogin = false;


function onDeviceReady() {

	if (initializeLogin) {
		return 
	} else {
		initializeLogin = true;
	}

	$('#btnSignUp').click(function(){

		// added username var
		var username = $('#username').val();
		var email = $('#txtEmail').val();
		var password = $('#pass1').val();
		var password2 = $('#pass2').val();
		if (password != password2) {
			console.log("Passwords don't match");
			return
		}
		// Is not logging username on console, only Firefox
		console.log(username);
		console.log(email);
		console.log(password);


		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log("create account page" + errorMessage);
		  // ...
		}).then(function(){
			// direct user to login page
			window.location.replace("./login.html");
		});

		
	});

};