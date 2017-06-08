'use strict';

$(document).ready(function() {
  $(document).on('invalid.zf.abide', function(ev) {

    // Hide all the input errors
    $(ev.target).filter('input').next('.form-error').addClass('hidden');

  }).on('forminvalid.zf.abide', function(ev) {

    // Show the first input error
    $('.form-error.is-visible').first().removeClass('hidden');

  }).on('formvalid.zf.abide', function(ev, $form) {

    // Submit the form if it's valid
    var $btn = $('#mc-embedded-subscribe');
    var $msg = $('#mce-error-response');

    $msg.hide().text('');
    $btn.prop('disabled', true).val('Signing Up…');

    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      error: function(err) {
          $btn.prop('disabled', false).val('Sign Up');
          $msg.text(err);
        },
      success: function(data) {
          if (data.result !== 'success') {
            $msg.text(data.result).show();
          } else {
            $('#success-modal').foundation('open');
          }
          $btn.prop('disabled', false).val('Sign Up');
        }
    });

  }).on('submit', function(ev) {
    ev.preventDefault();
  });
});
