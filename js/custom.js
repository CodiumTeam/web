/* Write here your custom javascript codes */
'use strict';

function trackEvent(category, action, label) {
    ga('send', 'event', category, action, label);
}

function navigateTo(destination) {
    trackEvent('navar', 'navigate', destination);
}

function moreInfo(service) {
    trackEvent('services', 'more_information', service);
}

function socialNetwork(name, networkName) {
    trackEvent('social_network', networkName, name);
}

function setContactAction(actionMessage) {
    $('#contact-action').val(actionMessage);
    trackEvent('contact_us', 'show_form', actionMessage);
}

var sendContactForm = function (e) {
    e.preventDefault();
    if (!grecaptcha.getResponse()){
        grecaptcha.execute();
        return;
    }
    var url = '/php/contact.php';
    $.post(url, $('#formulario-contacto-form').serialize())
    .done(function () {
        trackEvent('contact_us', 'sent', $('#contact-action').val());

        $('#error-contacto').fadeOut();
        $('#formulario-contacto').fadeOut().promise().done(function () {
            $('#gracias-contacto').fadeIn();
        });
    })
    .fail(function () {
        trackEvent('contact_us', 'failed');

        $('#error-contacto').fadeIn();
        $("html, body").animate({scrollTop: $(document).height()}, 1000);
    });
};
function captchaCompleted() {
    $('#formulario-contacto-form').submit();
}
$('#formulario-contacto-form').submit(sendContactForm);

$('input[name=trainingType]').change(function(e) {
    showEmployeesOrLocation($(e.target));
});

$(document).ready(function() {
    showEmployeesOrLocation($('input[name=trainingType]'));
});

function showEmployeesOrLocation(element) {
    if (element.val() == 'in-company') {
        showFormInput($('#numEmployees'));
        hideFormInput($('#location'));
    } else {
        hideFormInput($('#numEmployees'));
        showFormInput($('#location'));
    }
}

function showFormInput(element) {
    element.closest('.col-md-12').show();
    element.prop('required', true);
}

function hideFormInput(element) {
    element.closest('.col-md-12').hide();
    element.prop('required', false);
}

// Load images when are going to be displayed
let lazyLoad = new LazyLoad({});
jQuery(document).ready(function() {
    setTimeout(lazyLoad.loadAll(),100);
});


function contactForm(e) {
    e.preventDefault();
    if (!grecaptcha.getResponse()){
        grecaptcha.execute();
        return;
    }
    $.post(Codium.contactFormUrl, Codium.contactHTMLElement.serialize())
      .done(function () {
          trackEvent(Codium.contactFormTrackEvent, 'sent');

          // $('#error-contacto').fadeOut();
          $('#tdd-contact').fadeOut().promise().done(function () {
              $('#gracias-contacto-tdd').fadeIn();
          });
      })
      .fail(function () {
          // $('#error-contacto').fadeIn();
          // $("html, body").animate({scrollTop: $(document).height()}, 1000);
      });
}

function trainingCaptchaCompleted() {
    Codium.contactHTMLElement.submit();
}

function fixLandingResponsiveness() {
    var browserWidth = $(window).width();
    var desktopDeviceWidth = 992;
    if (browserWidth < desktopDeviceWidth) {
        $('#landing').removeClass('fullheight');
        $('#landing').css("height", "inherit");
    } else {
        $('#landing').addClass('fullheight');
    }
}

$(window).resize(function() {
    fixLandingResponsiveness();
});
