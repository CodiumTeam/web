import * as events from './common/trackEvents';
import { listenDropdown } from './common/dropdown';
import './common/contact-form-with-message';

import '../sass/site.scss';

listenDropdown();
events.initTrackEvents();
