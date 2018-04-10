document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initializeUserProfile = false;


function onDeviceReady() {

	if (initializeUserProfile) {
		return 
	} else {
		initializeUserProfile = true;
	}


	firebase.database().ref('users/' + userKey).on('value', function(userData){
		
		const userDataObj = userData.val();

		console.log(userData)
		
		$('#userName').text(userDataObj.name);
		$('#userEmail').val(userDataObj.email);

	});

	$('#delete-button-div').click(function(){
		$('#deleteUser').removeClass('display-none');

	})

	$(`#delete-cancel-entry`).click(function(){
    	window.location.replace("./settings-user-profile.html");
    });

	$('#delete-user-btn').click(function(){

		

		var user = firebase.auth().currentUser;

		user.delete().then(function() {
			// remove user from database
			firebase.database().ref('users/' + userKey).remove();
		  	// User deleted.
		}).catch(function(error) {
			// An error happened.
			var errorCode = error.code;
			var errorMessage = error.message;
			
			if (errorCode == 'auth/requires-recent-login'){
				alert("Delete account requires recent login authentication. Please log in again before retrying this request");
			}
		});

	});

	var user = firebase.auth().currentUser;

	user.updateEmail(email).then(function() {
		  // Update successful.
		}).catch(function(error) {
			console.log(error);
		  // An error happened.
		});


};