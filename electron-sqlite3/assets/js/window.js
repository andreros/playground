// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = window.$ = window.jQuery = require('jquery');
require('bootstrap');

var config = require('./js/common/config');
var database = require('./js/common/database');


// Get the PBCore root elements
var fetchingRootElements = database.getPBCoreRootElements();
$.when(fetchingRootElements).then(function(rootElements) {
    console.log('rootElements: ', rootElements);
    console.log('rootElements: ', rootElements.length);

    for (var i = 0; i < rootElements.length; i++) {
        window.$('#pb-core-root-elements')
            .append('<li><a href="javascript:void(0);">' + rootElements[i].screen_name + '</a></li>');
    }
}).fail(function(response) {

});
