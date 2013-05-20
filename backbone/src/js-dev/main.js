/* globals App */

$('body').prepend((new App()).render().$el);

// Fastclick
$(function() { FastClick.attach(document.body); });