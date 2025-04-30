import './assets/main.css';

import { router } from '../src/router.js';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-noir/theme.css';
import App from './App.vue';

// Add PrimeVue CSS imports
import 'primevue/resources/primevue.min.css'; // Core PrimeVue CSS
import 'primeicons/primeicons.css'; // PrimeIcons CSS

import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions';
import '@morev/vue-transitions/styles';

// Import Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the Font Awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import the required icons
import { faInstagram, faTwitch, faYoutube, faDiscord} from '@fortawesome/free-brands-svg-icons';

import { faShop, faUsers, faRecordVinyl, faCaretDown, faCaretUp, faComputer, faQuestion, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

// Add the icons to the library
library.add(faInstagram, faTwitch, faYoutube, faDiscord, faShop, faUsers, faRecordVinyl, faCaretDown, faCaretUp, faComputer, faQuestion, faMoneyBill);

import { createPinia } from 'pinia'


// Create the Vue app
const app = createApp(App);

// Register Font Awesome globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(vueTransitionsPlugin({
    // Default duration for all transitions now is `200`
    defaultProps: {
      duration: 200,
    },
    // But for `<transition-expand>` default duration is `500`
    componentDefaultProps: {
      TransitionExpand: {
        duration: 500,
      }
    }
  }));

// Use pinia
const pinia = createPinia()
app.use(pinia)

app.use(PrimeVue);
// Use the router and mount the app
app.use(router)

app.mount('#app');
