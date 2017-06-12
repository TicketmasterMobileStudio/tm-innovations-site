$(document).ready(function() {
  'use strict';

  if (Foundation.MediaQuery.current == 'small') {
    var heightOffset = viewport.max - viewport.min;
    var $content = $('.content');
    var $bg = $('.background');
    var currentMargin = window.getComputedStyle($content.get(0)).getPropertyValue('margin-top');
    var newOffset = parseFloat(currentMargin) - heightOffset;

    $content.css('margin-top', newOffset);
    $bg.css('height', newOffset);
  }
});
