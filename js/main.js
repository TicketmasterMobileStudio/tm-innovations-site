'use strict';

$(document).foundation();

$(document).ready(function() {

  // Inject SVGs so we can change colors
  var $SVGImgs = $('.product-nav-icon, .dropdown-arrow');
  var $responsiveSVGs = $SVGImgs.filter('.product-nav-icon');

  function injectCopy() {
    var $img = $(this);
    var $copy = $img.clone().hide();
    var $oldSVG = $img.next('.injected-svg');
    $img.after($copy);

    SVGInjector($copy.get(0), {
      each: function(svg) {

        // When the injection is done,
        // hide any previous <svg> or <img> elements
        if ($oldSVG.length > 0) {
          $oldSVG.remove();
        } else {
          $img.hide();
        }

        // ..and show the injected copy
        $(svg).show();
      }
    });
  }

  $responsiveSVGs.on('replaced.zf.interchange', injectCopy);
  $SVGImgs.each(injectCopy);

  // Call responsive dropdown manually, since the builtin method breaks on resize
  var $menu = $('#main-menu');
  var $btn = $('#menu-button');
  var sizes = ['small', 'medium'];
  var opts = {closingTime: 300};

  $(window).on('changed.zf.mediaquery', function(e, newSize, oldSize) {
    if ($.inArray(newSize, sizes) !== -1 && $.inArray(oldSize, sizes) === -1) {
      $menu.foundation('destroy');
    } else if ($.inArray(newSize, sizes) === -1 && $.inArray(oldSize, sizes) !== -1) {
      var menu = new Foundation.DropdownMenu($menu, opts);
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
    var menu = new Foundation.DropdownMenu($menu, opts);
    swapProductTitles();
  }

  // Set the panel height on mobile screens to account for collapsing browser chrome
  // TODO: Figure out how to get viewport.max accurately on iOS Chrome
  if (Foundation.MediaQuery.current == 'small') {

    // Adapted from https://gist.github.com/scottjehl/2051999
    var viewport = (function() {

    	var test = document.createElement('div');
    	test.style.height = '100vh';
    	document.documentElement.insertBefore(test, document.documentElement.firstChild);

    	var cssHeight = test.offsetHeight;
    	document.documentElement.removeChild(test);

      var innerHeight = window.innerHeight;

    	return {
        min: Math.min(cssHeight, innerHeight),
        max: Math.max(cssHeight, innerHeight)
      };
    })();

    var heightOffset = viewport.max - viewport.min;

    if ($('body').is('.home')) {
      var navHeight = $('.nav-container').height();

      $('#hero').css('height', viewport.min - navHeight);
      $('article').css('height', viewport.max);

    } else if ($('body').is('.product')) {
      var $content = $('.content');
      var $bg = $('.background');
      var currentMargin = window.getComputedStyle($content.get(0)).getPropertyValue('margin-top');
      var newOffset = parseFloat(currentMargin) - heightOffset;

      $content.css('margin-top', newOffset);
      $bg.css('height', newOffset)
    }
  }

  // init more arrow
  var options = {
   barOffset: Foundation.MediaQuery.current == 'small' ? -25 : 55,
   animationDuration: 300,
   animationEasing: 'swing'
  }
  var moreArrow = new Foundation.Magellan($('.more-arrow'), options);
});
