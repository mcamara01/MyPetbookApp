
document.addEventListener("deviceready", onDeviceReady, false);
$(document).ready(onDeviceReady);

var initialize = false;



function onDeviceReady() {
  if (initialize) {
    return 
  } else {
    initialize = true;
  }


  // top options nav open window
  $('#menu-hamb').click(function() {
      $('#top-options-nav').slideToggle("slow");
  });
 


  //jquery mobilex
  // $( document ).on( "vclick", "#menu-hamb", function() {
  //   $('#top-options-nav').slideToggle();
  //   });


  // ELIPSE MENU OPTIONS

  $('#menu-elipse').click(function() {
      $('#elipse-options-nav').slideToggle("slow");
  });
  
  // VACCINATION PAGE JS
  //---------------------------------------------------------------------- 
  // SET LOCAL STORAGE TO TEST VACCINATION
  // Local Storage testing one entry (add/save, delete, edit)


  

    var vaccineData = getData();
    
    $('#load-card').click(getData);
    $('#vaccine-name').text(vaccineData.name);
    $('#vaccine-date').text(vaccineData.date);  
    $('#vaccine-expiration').text(vaccineData.expiration);
  
  
  function getData(){

    var vaccineData = {
      name: localStorage.getItem("vaccineName"),
      date: localStorage.getItem("vaccineDate"),
      expiration: localStorage.getItem("vaccineExpiration")
    }
    return vaccineData;
  }
  
  function storeData(vaccineData){
     
    localStorage.setItem("vaccineName", vaccineData.name);
    localStorage.setItem("vaccineDate", vaccineData.date);
    localStorage.setItem("vaccineExpiration", vaccineData.expiration);
  }

  // Save Vaccine Data Button from New Vaccine Screen

  $('#save-vaccine-btn').click(function(){
    var saveVaccineData = {
      name: $('#new-vaccine-name').val(),
      date: $('#new-vaccine-date').val(),
      expiration: $('#new-vaccine-expiration').val()
    }
    storeData(saveVaccineData);

    window.location.replace("./vaccination.html");
  });

  // Edit Vaccine Button from Edit Vaccine Screen
  $('#edit-vaccine-btn').click(function(){
    var editVaccineData = {
      name: $('#edit-vaccine-name').val(),
      date: $('#edit-vaccine-date').val(),
      expiration: $('#edit-vaccine-expiration').val()
    }
    storeData(editVaccineData);

    window.location.replace("./vaccination.html");
  });

  // Delete Vaccine Button from Delete Screen
  $('#delete-vaccine-btn').click(function(vaccineData){
    localStorage.removeItem("vaccineName", vaccineData.name);
    localStorage.removeItem("vaccineDate", vaccineData.date);
    localStorage.removeItem("vaccineExpiration", vaccineData.expiration);
    window.location.replace("./vaccination.html");

  });

  // Edit Vaccine Data Stored

  $("#edit-vaccine").click(function(){
    $("#edit-card").removeClass("display-none");
    $("#load-card").addClass("display-none");
    var editVaccineData = getData();
    $('#edit-vaccine-name').val(editVaccineData.name);
    $('#edit-vaccine-date').val(editVaccineData.date);  
    $('#edit-vaccine-expiration').val(editVaccineData.expiration);
  });

  // Delete Vaccine Data Stored

  $("#delete-vaccine").click(function(){
    $("#delete-card").removeClass("display-none");
    $("#load-card").addClass("display-none");
    var deleteVaccineData = getData();
    $('#delete-vaccine-name').val(deleteVaccineData.name);
    $('#delete-vaccine-date').val(deleteVaccineData.date);  
    $('#delete-vaccine-expiration').val(deleteVaccineData.expiration);

  });


  // Add Vaccine from Add Button

  $('#imgPop').click(function(){
    $(".cards").addClass("display-none");
    $('#new-card').removeClass("display-none");

  });

  // Edit Vaccine Entry from Elipse Menu

  $('#edit-vaccine').click(function(){
    $(".cards").addClass("display-none");
    $('#edit-card').removeClass("display-none");

  });

  // Delete Vaccine Entry from Elipse Menu

  $('#delete-vaccine').click(function(){
    $(".cards").addClass("display-none");
    $('#delete-card').removeClass("display-none");
  });


  // POPUPS FOR SAVE BUTTON ON NEW AND EDIT VACCINATION PAGE

  // Save Info popup

  $('#save-info').click(function(){
  $('#addVaccine').removeClass("display-none");
  }); 

  $("#addVaccine").click(function(){
    $("#addVaccine").addClass("display-none");
  });

  // Edit Info Popup
  $('#edit-info').click(function(){
  $('#editVaccine').removeClass("display-none");
  }); 

  $("#editVaccine").click(function(){
    $("#editVaccine").addClass("display-none");
  });


   // Delete Info Popup
  $('#delete-info').click(function(){
  $('#deleteVaccine').removeClass("display-none");
  }); 

  $("#deleteVaccine").click(function(){
    $("#deleteVaccine").addClass("display-none");
  });



// GENERAL INFO PAGE JS
  //---------------------------------------------------------------------- 


// $('#edit-general-info').click(function(){
//     $(".cards").addClass("display-none");
//     $('#edit-card').removeClass("display-none");

//   });






};

  