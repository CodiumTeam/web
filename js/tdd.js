var form = $('#tdd-contact-form');
form.submit(function (e) {
  var url = '/php/contact-tdd.php';
  $.post(url, form.serialize())
  .done(function () {
    // $('#error-contacto').fadeOut();
    // $('#formulario-contacto').fadeOut().promise().done(function () {
    //   $('#gracias-contacto').fadeIn();
    // });
    alert("Gracias por contactar");
  })
  .fail(function () {
    // $('#error-contacto').fadeIn();
    // $("html, body").animate({scrollTop: $(document).height()}, 1000);
  });
  e.preventDefault();
});