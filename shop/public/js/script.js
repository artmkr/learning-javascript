function appendToList(items) {
    $.each(items, function(index, item) {
        var content = '<img src="' + item.image + '"> \
        <div class="description">' + item.name + '</div> \
        <div class="count">' + item.count + ' items left' + '</div> \
        <div class="price">' + '$' + item.price + '</div> \
        <button>buy</button> '
        $('#items').append('<li class="item">' + content + '</li>');
    });
}

$(document).ready(function() {
    $.get('/shop', appendToList);
});