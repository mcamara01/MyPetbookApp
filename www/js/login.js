
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
		console.log(email);
		console.log(password);

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;

		  // append popup with error message
		  $('#errorMessage').removeClass("display-none").append(`<div class="popup-content box-shadow-all-light">
                    <p> Sorry!  
                    <br>
                    <p> ${errorMessage} 
                    <br>
                    <p>Please, try it again.
                    <div class="options-align">
                      <button id="ok-btn" class="submit">OK</button>
                    </div>
                  </div>`);
		  $('#ok-btn').click(function(){
		  	$("#errorMessage").addClass("display-none");
		  		// direct user when successfull loged in to login page
			    window.location.replace("./login.html");
		  })
		  console.log(errorMessage);
		  console.log(errorCode);
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