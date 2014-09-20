// ==UserScript==
// @name        Leap Motion Jquery Reddit
// @namespace   rifat.cse.unr.edu
// @description Lets you scroll up and down with right swipe and left swipe in the redit website. You can up vote using a like gesture and downvote using dislike gesture.
// @include     http://reddit.com/*
// @include     http://www.reddit.com/*
// @version     1.0
// @require     http://js.leapmotion.com/leap-0.6.0.js
// @require     https://raw.githubusercontent.com/itsrifat/jquery-leapmotion/master/jquery.leapmotion.js
// @grant       none
// ==/UserScript==

/*
Add some simple global styles to the DOM to control the look while using gesture

*/
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) {
    return;
  }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('.highlighted { border: 2px solid; }');



$(document).ready(function() {
  var curr = $("#siteTable > div.thing:visible:first");
  var currgesture;
  $.leapmotion();
  $(window).bind('swiperight', function(e, gesture) {

    currgesture = 'bottom';

  });

  $(window).bind('swipeleft', function(e, gesture) {

    currgesture = 'top';

  });

  $(window).bind('swipestop', function(e, gesture) {
    //console.log(gesture);
    //console.log('stop ' + currgesture);

    if (currgesture == 'top' && curr.closest('.thing').prevAll('.thing').eq(0).length != 0) {
      var scrolltoElemet = curr.closest('.thing').prevAll('.thing').eq(0);
      //console.log('going up');
      jQuery("body:first").animate({
        scrollTop: scrolltoElemet.offset().top
      }, 200);
      curr.removeClass('highlighted');
      curr = scrolltoElemet;


    } else if (curr.closest('.thing').nextAll('.thing').eq(0).length != 0) {
      var scrolltoElemet = curr.closest('.thing').nextAll('.thing').eq(0);
      //console.log('going down');
      jQuery("body:first").animate({
        scrollTop: scrolltoElemet.offset().top
      }, 200);
      curr.removeClass('highlighted');
      curr = scrolltoElemet;

    }
    curr.addClass('highlighted');

  });
  $(window).bind('like', function(e) {
    //console.log('like');
    $('.arrow.up ', curr).click();
  });
  $(window).bind('dislike', function(e) {
    //console.log('dislike');
    $('.arrow.down ', curr).click();
  });

  $(window).bind('streamingStarted', function(e) {
    console.log("Leap Motion Connected");
  });



});
