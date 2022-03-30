export function reveal() {
  var reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top - 30;

    if (elementTop < windowHeight) {
      reveals[i].classList.add('active');
    }
  }
}
