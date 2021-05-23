$(document).ready(function () {

    $("form[name='add_form']").validate({
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
    $('#add_form').submit(function (event) {
        if (!$("#add_form").valid()) return;

        console.log("in submit");
        let dataJson = '{"' + $("#tourname").val() + '":{' +
            '"start_date":' + "\"" + $("#startDate_field").val() + "\"" + ',' +
            '"duration":' + $("#duration").val() + ',' +
            '"price":' + $("#price").val() + ',' +
            '"guide": {' +
            '"name":' + '"' + $("#Guidename").val() + '"' + ',' +
            '"email":' + '"' + $("#email").val() + '"' + ',' +
            '"cellular":' + '"' + $("#cellular").val() + '"' + '},' +
            '"path": [] } }';


        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/createTour', // the url where we want to PUT
            contentType: 'application/json',
            data: dataJson,
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
