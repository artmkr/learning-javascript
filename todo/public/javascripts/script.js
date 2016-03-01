$(function() {
    function appendToList(tasks) {
        $.each(tasks, function(index, task) {
            var content = '<a href="#" data-task="' + task + '">✓</a>' + task;
            $('#tasks').append('<li>' + content + '</li>');
        });
    }

    $.get('/tasks', appendToList);

    $('#tasks').on('click', 'a[data-task]', function(event) {
        if (!confirm('Are you sure?')) {
            return false;
        }

        var target = $(event.currentTarget);
        $.ajax({
            type: 'DELETE',
            url: '/tasks/' + target.data('task')
        }).done(function() {
            target.parents('li').remove();
        });
    });

    $("form").on('submit', function() {
        event.preventDefault();
        form = $(this);
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: form.serialize()
        }).done(function(task) {
            appendToList([task]);
        });
    });
});