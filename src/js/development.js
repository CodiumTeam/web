import Glide, {
  Controls,
  Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm';
import './common/contact-form-with-message';
import { langsSwitcher, listenDropdown } from './common/dropdown';

import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import '../sass/development.scss';

listenDropdown();
langsSwitcher();
mountClientsCarousel();

function mountClientsCarousel() {
  const glide = new Glide('#clients', {
    type: 'carousel',
    autoplay: false,
    startAt: 0,
    gap: 10,
    perView: 5,
    breakpoints: {
      450: {
        perView: 1,
      },
      600: {
        perView: 2,
      },
      900: {
        perView: 3,
      },
      980: {
        perView: 4,
      },
    },
  });

  glide.mount({ Controls, Breakpoints });

  addClientEventForArrows('.js-clients-arrow', glide);
}

// This is a fix for https://github.com/glidejs/glide/issues/417
function addClientEventForArrows(arrowClass, glide) {
  const glideArrows = document.querySelectorAll(arrowClass);

  glideArrows.forEach(function (glideArrow) {
    glideArrow.addEventListener('click', function () {
      glide.go(glideArrow.dataset.glideDir);
    });
  });
}
