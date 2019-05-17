var form = $('#contact-form');
function tddContantForm (e) {
    e.preventDefault();
    if (!grecaptcha.getResponse()){
        grecaptcha.execute();
        return;
    }
    var url = '/php/contact-tdd.php';
    $.post(url, form.serialize())
    .done(function () {
        trackEvent('tdd_training', 'sent');

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
    $('#contact-form').submit();
}
form.submit(tddContantForm);

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
