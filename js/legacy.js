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
