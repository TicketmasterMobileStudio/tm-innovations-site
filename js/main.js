// Get the viewport, used for height-related layouts
// Adapted from https://gist.github.com/scottjehl/2051999
// TODO: Figure out how to get viewport.max accurately on iOS Chrome
var viewport = (function() {
  'use strict';

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

// Prevent small screen page refresh sticky bug
$(window).on('sticky.zf.unstuckfrom:bottom', function(e) {
  if (!Foundation.MediaQuery.atLeast('medium')) {
    $(e.target).removeClass('is-anchored is-at-bottom').attr('style', '');
  }
});

$(document).foundation().ready(function() {
  'use strict';

  // Inject SVGs so we can change colors
  var $SVGImgs = $('.product-nav-icon, .dropdown-arrow, .overlay img[src$=".svg"]');
  var $responsiveSVGs = $SVGImgs.filter('.product-nav-icon');

  var injectCopy = function() {
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
  };

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
      $('html').removeClass('menu-open');
    }
  });

  // Add the dropdown on first load on large screens
  if (Foundation.MediaQuery.atLeast('large')) {
    var menu = new Foundation.DropdownMenu($menu, opts);
  }

  // Add an html class based on menu state
  $btn.parent().on('toggled.zf.responsiveToggle', function(e) {
    $('html').toggleClass('menu-open', !$btn.hasClass('open'));

    if (!$btn.hasClass('open') && !Foundation.MediaQuery.atLeast('medium')) {
      $(window).scrollTop(0);
    }
  });

  // Don't close dropdown when unreleased product is clicked
  $('.unreleased > a').click(function(e) {
    e.stopPropagation();
  });
});
