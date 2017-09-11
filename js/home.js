$(document).ready(function() {
  'use strict';

  // Initialize all the things
  setPanelHeight(Foundation.MediaQuery.current);
  initMoreArrow(Foundation.MediaQuery.current, null);
  addDetailTransitions(Foundation.MediaQuery.current, null);

  // Re-run size-specific things on window resize
  $(window).resize(function() {
    setPanelHeight(Foundation.MediaQuery.current);
  });

  // Re-run some things when the size class changes
  $(window).on('changed.zf.mediaquery', function(e, newSize, oldSize) {
    initMoreArrow(newSize, oldSize);
    addDetailTransitions(newSize, oldSize);
  });

  // Set the panel height on mobile screens to account for collapsing browser chrome
  function setPanelHeight(size) {
    if (size === 'small') {
      var heightOffset = viewport.max - viewport.min;
      var navHeight = $('.nav-container').height();

      $('#hero').css('height', viewport.min - navHeight);
      $('article').css('height', viewport.max);
    } else {
      $('#hero').css('height', '');
      $('article').css('height', '');
    }
  }

  // Add smooth scrolling to the "more" arrow
  function initMoreArrow(newSize, oldSize) {
    if (newSize === 'small' || oldSize === 'small' || oldSize === null) {
      var options = {
       barOffset: newSize === 'small' ? -25 : 55,
       animationDuration: 300,
       animationEasing: 'swing'
      };

      var moreArrow = new Foundation.Magellan($('.more-arrow'), options);
    }
  }

  // Ease transition to product detail
  function addDetailTransitions(newSize, oldSize) {
    if (Foundation.MediaQuery.atLeast('medium') && (oldSize === null || oldSize === 'small')) {
      $('article.product').each(function() {
        var $product = $(this);
        var $links = $('[href^="/products"]', $product);

        $links.each(function() {
          $(this).click(function(e) {
            e.preventDefault();
            $product.addClass('in-transition');
            $('.pager ul').foundation('scrollToLoc', '#' + $product.attr('id'));

            var navigate = setTimeout(function(dest) {
              location.href = dest;

              // Clean up by removing the transition class
              var removeTransition = setTimeout(function() {
                $product.removeClass('in-transition');
              }, 300);
            }, 300, e.target.href);
          });
        });
      });
    } else if (newSize === 'small') {
      $('article.product [href^="/products"]').each(function() {
        $(this).off('click');
      });
    }
  }
});
