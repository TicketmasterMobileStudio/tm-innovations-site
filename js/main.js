'use strict';

$(document).foundation();

$(document).ready(function() {
  // Inject SVGs so we can change colors
  var $SVGImgs = $('.product-nav-icon, .dropdown-arrow');

  function injectCopy() {
    var $img = $(this);
    var $copy = $img.clone();
    var $oldSVG = $img.next('.injected-svg');

    if ($oldSVG.length > 0) {
      $oldSVG.remove();
      $copy.show();
    } else {
      $img.hide();
    }

    $img.after($copy);
    SVGInjector($copy.get(0));
  }

  $SVGImgs.on('replaced.zf.interchange', injectCopy);
  $SVGImgs.each(injectCopy);

  // Call responsive dropdown manually, since the builtin method breaks on resize
  var $menu = $('#main-menu');
  var $btn = $('#menu-button');
  var sizes = ['small', 'medium'];

  $(window).on('changed.zf.mediaquery', function(e, newSize, oldSize) {
    if ($.inArray(newSize, sizes) !== -1 && $.inArray(oldSize, sizes) === -1) {
      $menu.foundation('destroy');
    } else if ($.inArray(newSize, sizes) === -1 && $.inArray(oldSize, sizes) !== -1) {
      var menu = new Foundation.DropdownMenu($menu);
    }

    if ($btn.hasClass('open')) {
      $btn.removeClass('open');
    }
  });

  // Swap titles with short titles on large screens
  function swapProductTitles() {
    var $productTitles = $('span[data-title]', $menu);

    if (Foundation.MediaQuery.atLeast('large')) {
      $productTitles.each(function() {
        $(this).text(this.dataset.shorttitle);
      });
    } else {
      $productTitles.each(function() {
        $(this).text(this.dataset.title);
      });
    }
  }

  $(window).on('changed.zf.mediaquery', swapProductTitles);

  // Add the dropdown on first load on large screens
  if (Foundation.MediaQuery.atLeast('large')) {
    var menu = new Foundation.DropdownMenu($menu);
    swapProductTitles();
  }

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
