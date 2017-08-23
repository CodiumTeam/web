var form = $('#tdd-contact-form');
form.submit(function (e) {
    var url = '/php/contact-tdd.php';
    $.post(url, form.serialize())
        .done(function () {
            // $('#error-contacto').fadeOut();
            $('#tdd-contact').fadeOut().promise().done(function () {
                $('#gracias-contacto-tdd').fadeIn();
            });
        })
        .fail(function () {
            // $('#error-contacto').fadeIn();
            // $("html, body").animate({scrollTop: $(document).height()}, 1000);
        });
    e.preventDefault();
});

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
