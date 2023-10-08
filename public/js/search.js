// search.js

$(document).ready(function() {
    $('#searchForm').submit(function(e) {
        e.preventDefault(); 

        var searchTerm = $('#search').val(); 
        var newAction = '/' + searchTerm; 

        $(this).attr('action', newAction);

        // Submit the form
        this.submit();
    });
});
