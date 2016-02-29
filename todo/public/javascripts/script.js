$(function() {


    $("form").on('submit', function() {
        event.preventDefault();
        form = $(this);
        var task = ((form.serializeArray())[0])['value'];

        $.ajax({
            type: 'POST',
            url: '/',
            data: form.serialize()
        }).done(function(task) {
            $("#tasks").append('<li>' + task + '</li>');
            form.trigger('reset');
        });
    });
});