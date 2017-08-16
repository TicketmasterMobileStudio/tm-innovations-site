$(document).ready(function() {
  'use strict';

  // Set content vertical offset while accounting for browser chrome
  setHeights();

  $(window).on('changed.zf.mediaquery', setHeights);

  function setHeights() {
    var $content = $('.content');
    var $bg = $('.background');

    if (!Foundation.MediaQuery.atLeast('medium')) {
      var heightOffset = viewport.max - viewport.min;
      var currentMargin = window.getComputedStyle($content.get(0)).getPropertyValue('margin-top');
      var newOffset = parseFloat(currentMargin) - heightOffset;

      $content.css('margin-top', newOffset);
      $bg.css('height', newOffset);
    } else {
      $content.css('margin-top', '');
      $bg.css('height', '');
    }
  }
});
