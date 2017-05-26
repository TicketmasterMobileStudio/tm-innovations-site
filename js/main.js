'use strict';

$(document).ready(function() {
  $('.product-nav-icon, .dropdown-arrow').each(function() {
    $(this).on('replaced.zf.interchange', SVGInjector(this));
  });
});
