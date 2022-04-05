import { listenDropdown } from './common/dropdown';

import '../sass/resources.scss';

listenDropdown();

document.querySelectorAll('.js-image').forEach((imageLink) => {
  const $img = imageLink.firstChild.nextElementSibling;

  imageLink.href = $img.src;
});
