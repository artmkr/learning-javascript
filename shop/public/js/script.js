$(document).ready(function() {
    $.ajax({
        url: '/shop',
        type: 'GET',
    })
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            alert('something went wrong')
        })
});