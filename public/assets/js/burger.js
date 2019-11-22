/**
 * @subpackage view/burger
 * @package burger
 *
 * ===============[ TABLE OF CONTENTS ]===============
 * 1. Functions
 *   1.1 AlertMessage() 
 * 
 * 2. Document Ready 
 *   2.1 toggle devoured button
 *   2.2 Add Burger Form
 * 
 *****************************************************/
/* ===============[ 1. Functions ]===================*/
/**
 * 1.1 AlertMessage()
 * @param {string} message - Message to go in the alert box
 * @param {string} addThisClass - defaults to empty string. Can be info, danger, or success. 
 */
function AlertMessage(message="", addThisClass="info", appendAfterElement){
  $('#alert_message').remove();

  var alertElement = $("<div>").addClass("col-12 alert").attr("id","alert_message");
  
  // RESET Alert Message
  if(message === ""){
    $("#main-section .first-row").empty();
    return;
    
  }else if (addThisClass === "info"){ 
    // Default alert
    addThisClass = "alert-info";
    
  }else if (addThisClass === "danger"){
    addThisClass = "alert-danger";
    
  }else if (addThisClass === "success"){
    addThisClass = "alert-success";
  }
  
  // IF same alert message keeps getting spammed then add ! and change color red
  if( $("#alert-messages").html() !== undefined && $("#alert-messages").html() === message ){
    message += "!";
    addThisClass = "alert-danger";
  }
  
  // Add the new class
  alertElement.addClass(addThisClass);
  
  // Display the alert message
  alertElement.html(message);

  if(appendAfterElement === undefined){
    appendAfterElement = $("#main-section");
  }

  appendAfterElement.append(alertElement);
  return;
}

/* ===============[ 2. Document Ready ]==============*/ 
$(function(){
  
  // 2.1 toggle devoured button
  $(".change-devoured").on("click", function(event){
    var id = $(this).data("id");
    var eaten = $(this).data("eaten");
    var isDevoured = (eaten) ? false : true;
    var newData = { devoured: isDevoured }

    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: newData
    }).then(function(){
      console.log("Changed devoured to", newData);
      location.reload();
    });
  });

  // 2.2 Add Burger Form
  $("#add-burger-form").on("submit", function(event){
    event.preventDefault();
    var isValid = true;
    var formArray = $("#add-burger-form").serializeArray();
    var formData = {};

    // Collect formData
    for (var i in formArray){
      var KEY = "";
      var VALUE = "";

      for (var key in formArray[i]){
        if(key === "name"){
          KEY = formArray[i][key];
        }else if(key === "value"){
          VALUE = formArray[i][key];
        }
      }

      formData[KEY] = VALUE.trim();

      // prevent empty entries in the database
      if(formData[KEY] === "" || formData[KEY] === "0" || formData === false){
        isValid = false;
      }
    }

    // Add to database if isValid
    if(isValid){
      $.ajax("/api/burger", {
        type: "POST",
        data: formData
      }).then(function(){
        console.log("Created New Burger");
        AlertMessage("Created New Burger", "success", $("#add-burger-form"));
        location.reload();
      });

    }else{
      console.log("Invalid burger name!");
      AlertMessage("Invalid burger name!", "danger", $("#add-burger-form"));
    }
  });

}); // END $(document).ready(function() { 