$(document).ready(function () {

  $("form[name='edit_form']").validate({
    // Specify validation rules
    rules: {
      "duration":{
          min:0
      },
      "price":{
          min:0
      },
      "cellular": {
          minlength: 10
      }
  },
  // Specify validation error messages
  messages: {
      duration: {
          digits: "Please enter only digits"
      },
      price: {
          digits: "Please enter only digits"
      },
      email: "email structure is some@domain ",
      cellular: "Cellular need to be 10 digit at least"
  }
  });

  // process the form
  $('#edit_form').submit(function (event) {
    if (!$("#edit_form").valid()) return;

    let dataJson = {}
    if ($("#startDate_field").val() != "")
      dataJson["start_date"] = $("#startDate_field").val()
    if ($("#duration").val() != "")
      dataJson["duration"] = $("#duration").val()
    if ($("#price").val() != "")
      dataJson["price"] = $("#price").val()
    let guide = {}
    if ($("#guidename").val() != "")
    {
      console.log("in name")
      guide["name"] = $("#guidename").val()
      dataJson["guide"]=guide
    }
    if ($("#email").val() != "")
    {
      
      guide["email"] = $("#email").val()
      dataJson["guide"]=guide
    }
    if ($("#cellular").val() != "")
    {
      console.log("in cellular")
      guide["cellular"] = $("#cellular").val()
      dataJson["guide"]=guide
    }


    // process the form
    $.ajax({
      type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
      url: '/tourId/' + window.location.hash.substring(1), // the url where we want to PUT
      contentType: 'application/json',
      data: JSON.stringify(dataJson),
      processData: false,
      // dataType: 'json', // what type of data do we expect back from the server
      encode: true,
      success: function (data, textStatus, jQxhr) {
        console.log(data);
        location.href = "/list";

      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    })

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

});
