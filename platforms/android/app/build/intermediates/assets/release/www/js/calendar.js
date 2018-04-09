// CALENDAR PAGE JS
  //----------------------------------------------------------------------

  document.addEventListener("deviceready", onDeviceReady, false);
  $(document).ready(onDeviceReady);

  var initializeCalendar = false;


  function onDeviceReady() {

  	if (initializeCalendar) {
  		return
  	} else {
  		initializeCalendar = true;
  	}

  	$('#calendar').click(function(){

  // 		console.log('calendar is working');
  // 		// Following https://plugins.telerik.com/cordova/plugin/calendar

	 //  	// Prepare some variables used below
	 //  	var cal = window.plugins.calendar;
	 //  	var title = "New Years party";
	 //  	var loc = "The Club";
	 //  	var notes = "Bring pizza.";
		// var start = new Date(2018,3,10,20,0,0,0,0); // Jan 1st, 2015 20:00
		// var end = new Date(2018,3,10,22,0,0,0,0);   // Jan 1st, 2015 22:00
		// var calendarName = "MyCal";

		// var onSuccess = function(message) {
		// 	console.log(message)
		// };
		// var onError   = function(message) {
		// 	alert("Error: " + message)
		// };


		// creating events
		// createEvent shows an interactive dialog allowing the user to change the details of the event
		// cal.createEventInteractively(title, loc, notes, start, end, onSuccess, onError);

		// // finding events
		// cal.findEvent(title, loc, notes, start, end, onSuccess, onError);

		 // list all events in a date range (only supported on Android for now)
  		// cal.listEventsInRange(start,end,onSuccess,onError);

		// // deleting events
		// cal.deleteEvent(title, loc, notes, start, end, onSuccess, onError);


		// // listing all calendars
		// cal.listCalendars(onSuccess, onError);



		// // creating and managing calendar
		// var options = cal.getCreateCalendarOptions();
		// options.calendarName = calendarName;
		// options.calendarColor = "#FF0000"; // passing null make iOS pick a color for you
		// cal.createCalendar(options, onSuccess, onError);

		// cal.deleteCalendar(calendarName, onSuccess, onError);


		// opening the calendar 
		// to open the calendar app at 'today'
		window.plugins.calendar.openCalendar();


	});

  	
}; // end on device ready