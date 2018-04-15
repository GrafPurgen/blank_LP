$('#form-bottom-contact-us').submit(function(e){

    e.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: 'mailer.php',
        data: formData,
        })

        .done(function(response){

        })

        .fail(function(response){

        })
});