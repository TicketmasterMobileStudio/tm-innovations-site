$(document).ready(function() {
  'use strict';


  // Set the panel height on mobile screens to account for collapsing browser chrome
  if (Foundation.MediaQuery.current == 'small') {
    var heightOffset = viewport.max - viewport.min;
    var navHeight = $('.nav-container').height();

    $('#hero').css('height', viewport.min - navHeight);
    $('article').css('height', viewport.max);
  }

  // init more arrow
  var options = {
   barOffset: Foundation.MediaQuery.current == 'small' ? -25 : 55,
   animationDuration: 300,
   animationEasing: 'swing'
  };
  var moreArrow = new Foundation.Magellan($('.more-arrow'), options);
});
