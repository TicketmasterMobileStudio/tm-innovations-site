'use strict';

$(document).ready(function() {

  // Submit EAP form
  $(document).on('formvalid.zf.abide', function(ev, $form) {
    var $btn = $('#mc-embedded-subscribe');
    var $msg = $('#mce-error-response');

    $msg.hide().text('');
    $btn.prop('disabled', true).val('Signing Up&hellip;');

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

  // Hide all but first validation error on EAP form
  var timeout;

  $('.eap form[data-abide] input').on('invalid.zf.abide', function() {
    clearTimeout(timeout);
    timeout = setTimeout(hideLabels, 10);
  });

  function hideLabels() {
    var $errors = $('input[data-invalid] + .form-error');
    $errors.each(function(i) {
      if (i !== 0) {
        $(this).removeClass('is-visible');
      }
    });
  }
});
