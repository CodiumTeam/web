/* Write here your custom javascript codes */
'use strict';

function setContactAction($actionMessage) {
  $('#contact-action').val($actionMessage);
}

$('#formulario-contacto-form').submit(function(e) {
  var url = '/php/demo-contacts-process.php';
  $.post(url, $('#formulario-contacto-form').serialize())
  .done(function() {
    $('#formulario-contacto').fadeOut().promise().done(function() {
      $('#gracias-contacto').fadeIn();
    });
  })
  .fail(function(){
    $('#error-contacto').fadeIn();
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  });
  e.preventDefault();
});