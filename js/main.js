'use strict';

$(document).ready(function() {
  $('.product-nav-icon').each(function() {
    $(this).on('replaced.zf.interchange', SVGInjector(this));
  });
});
