/**
 * file: index.js
 * description: JSON Placeholder API Test.
 * author: André Rosa
 */

function executeRequest(method, url) {
    var root = 'http://jsonplaceholder.typicode.com'; // straight call to the JSONPlaceholder API
        // tunneled call to the JSONPlaceholder through 'json-placeholder-tunnel-api'
        // to make calls to the local (tunnel) API, please run the 'json-placeholder-tunnel-api' project
        // root = 'http://localhost:8080/api/v1';
        root = 'http://andreros.ddns.net:5000/api/v1';

    $.ajax({
        url: root + url,
        method: method
    }).then(function(data, textStatus, jqXHR) {
        $('#jsonResponse').html(JSON.stringify(jqXHR.responseJSON, null, 4));
    });
};

// buttons event handlers

$('#getPosts').on('click', function() {
    executeRequest('GET', '/posts');
});

$('#getPostOne').on('click', function() {
    executeRequest('GET', '/posts/1');
});

$('#getPostOneComments').on('click', function() {
    executeRequest('GET', '/posts/1/comments');
});

$('#getComments').on('click', function() {
    executeRequest('GET', '/comments');
});

$('#getCommentsPostOne').on('click', function() {
    executeRequest('GET', '/comments?postId=1');
});

$('#getPostsUserOne').on('click', function() {
    executeRequest('GET', '/posts?userId=1');
});

$('#getAlbums').on('click', function() {
    executeRequest('GET', '/albums');
});

$('#getPhotos').on('click', function() {
    executeRequest('GET', '/photos');
});

$('#getToDos').on('click', function() {
    executeRequest('GET', '/todos');
});

$('#getUsers').on('click', function() {
    executeRequest('GET', '/users');
});

$('#PostPosts').on('click', function() {
    executeRequest('POST', '/posts');
});

$('#PutPostOne').on('click', function() {
    executeRequest('PUT', '/posts/1');
});

$('#PatchPostOne').on('click', function() {
    executeRequest('PATCH', '/posts/1');
});

$('#DeletePostOne').on('click', function() {
    executeRequest('DELETE', '/posts/1');
});
