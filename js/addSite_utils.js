$(document).ready(function () {

   

    // process the form
    $('#addSite_form').submit(function (event) {
       

        console.log("in submit");
        let dataJson = '{ "name": "'+$("#name").val()+'","country": "'+ $("#country").val()+'"}';


        // process the form
        $.ajax({
            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: '/site/'+ window.location.hash.substring(1), // the url where we want to PUT
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
