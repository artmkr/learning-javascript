function appendToList(items) {
    $.each(items, function(index, item) {
        var content = '<img src="' + item.image + '"> \
        <div class="description"> \
        <a href="/description/' + item.name + '"">' + item.name + '</a></div> \
        <div class="count">' + item.count + ' items left' + '</div> \
        <div class="price">' + '$' + item.price + '</div> \
        <button id="' + item.name + '">buy</button> '
        $('#items').append('<li class="item">' + content + '</li>');
    });
}

$(document).ready(function() {
    $(document).on('click', 'button', function(event) {
        $.ajax({
            url: 'http://localhost:3000/shop/' + event.target.id,
            type: 'PUT',
        })
            .done(function(res) {
                target = $(event.target);
                current_count = parseInt(target.parent().find('.count').text());
                current_count -= 1;
                target.parent().find('.count').text(current_count + ' items left');
            })
            .fail(function() {
                alert('items out of stock');
            })
    });
    $.get('/shop', appendToList);
});