$(document).foundation();

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

$(document).ready(function() {
  'use strict';

  // Inject SVGs so we can change colors
  var $SVGImgs = $('.product-nav-icon, .dropdown-arrow');
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
});
