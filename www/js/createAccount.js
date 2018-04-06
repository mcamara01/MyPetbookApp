
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
		if(document.getElementById('checkBox').checked){
		// added username var
		var name = $('#username').val();
		var email = $('#txtEmail').val();
		var password = $('#pass1').val();
		var password2 = $('#pass2').val();
		if (password != password2) {
			console.log("Passwords don't match");
			return
		}
		// Is not logging username on console, only Firefox
		console.log(name);
		console.log(email);
		console.log(password);


		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log("create account page" + errorMessage);
		  // ...
		}).then(function(){

			console.log("checking function")
			console.log(firebase.auth().currentUser);
			
			var user = firebase.auth().currentUser;
		    // code to get user uid from auth
		    var userKey = user.uid;

			const userData = {
				name: name,
				email: email,
			} 

	    	console.log(userData);
	        // set userKey to Local Storage
	        localStorage.setItem('userKey', userKey);

	        // path to set the user key data to Firebase
	        firebase.database().ref('users/' + userKey).update(userData).then(function(){

	          // direct user when successfull loged in to index page
	          window.location.replace("./index.html");

	      });


		   
			// // direct user to login page
			// window.location.replace("./login.html");
		});

		} else {
			alert("read terms and conditions")
		}
	});

};