import { listenDropdown } from '../common/dropdown';
import sdk from '@stackblitz/sdk';
import './challenge.scss';
import { tabs } from './tabs';
import { options } from './options';

listenDropdown();

const el = document.getElementById('editor');
sdk
  .embedProjectId(el, 'tdd-challenge-1', {
    forceEmbedLayout: true,
    openFile: 'README.md',
    view: 'editor',
    theme: 'dark',
    hideNavigation: true,
  })
  .then((vm) => {
    console.log(vm);
  })
  .catch((err) => {
    console.log(err);
  });

function tddTabs() {
  const tab = tabs('tdd');
  options('whatIsTdd', () => {
    tab.enableButton();
  });
  options('tddCycle', () => {
    tab.enableButton();
  });
}

tddTabs();
