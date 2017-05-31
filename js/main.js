'use strict';

$(document).ready(function() {
  // Inject SVGs so we can change colors
  $('.product-nav-icon, .dropdown-arrow').each(function() {
    $(this).on('replaced.zf.interchange', SVGInjector(this));
  });

  // Set the panel height on mobile screens to account for collapsing browser chrome
  if (Foundation.MediaQuery.current == 'small') {

    // Adapted from https://gist.github.com/scottjehl/2051999
    function viewportHeight() {
    	var test = document.createElement('div');
    	test.style.height = '100vh';
    	document.documentElement.insertBefore(test, document.documentElement.firstChild);

    	var height = test.offsetHeight;
    	document.documentElement.removeChild(test);

    	return height;
    }

    var heightOffset = viewportHeight() - window.innerHeight;

    if ($('body').is('.home')) {
      var $hero = $('#hero');
      $hero.height($hero.height() - heightOffset);
    } else if ($('body').is('.product')) {
      var $content = $('.content');
      var currentMargin = window.getComputedStyle($content.get(0)).getPropertyValue('margin-top');
      var newMargin = parseFloat(currentMargin) - heightOffset;
      $content.css('margin-top', newMargin);
    }
  }
});
