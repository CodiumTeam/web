import { langsSwitcher, listenDropdown } from './common/dropdown';

import '../sass/404.scss';

listenDropdown();
langsSwitcher();

document.querySelectorAll('.icon-test').forEach((item) => {
  const timeInMS = Math.floor(Math.random() * 6);
  setTimeout(() => {
    const element = item;
    if (element.classList.contains('test-error')) {
      element.classList.add('icon-test--error');
    } else {
      element.classList.add('icon-test--success');
    }
  }, timeInMS * 1000);
});
