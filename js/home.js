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

  // ease transition to product detail
  if (Foundation.MediaQuery.atLeast('medium')) {
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
          }, 300, e.target.href);
        });
      });
    });
  }
});
