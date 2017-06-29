/* Write here your custom javascript codes */
'use strict';

function trackEvent(category, action, label) {
    ga('send', 'event', category, action, label);
}

function setContactAction(actionMessage) {
    $('#contact-action').val(actionMessage);
    trackEvent('contact_us', 'show_form', actionMessage);
}

$('#formulario-contacto-form').submit(function (e) {
    var url = '/php/demo-contacts-process.php';
    $.post(url, $('#formulario-contacto-form').serialize())
        .done(function () {
            trackEvent('contact_us', 'sent', $('#contact-action').val());

            $('#formulario-contacto').fadeOut().promise().done(function () {
                $('#gracias-contacto').fadeIn();
            });
        })
        .fail(function () {
            trackEvent('contact_us', 'failed');

            $('#error-contacto').fadeIn();
            $("html, body").animate({scrollTop: $(document).height()}, 1000);
        });
    e.preventDefault();
});

$('#training-more-info-btn').click(function () {
    trackEvent('services', 'more_information', 'training');
});
$('#coaching-more-info-btn').click(function () {
    trackEvent('services', 'more_information', 'coaching');
});
$('#development-more-info-btn').click(function () {
    trackEvent('services', 'more_information', 'development');
});
