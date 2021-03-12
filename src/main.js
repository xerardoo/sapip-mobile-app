import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import {BootstrapVue} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/util.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {
    faUserSecret,
    faChevronRight,
    faChevronLeft,
    faChevronUp,
    faChevronDown,
    faCamera,
    faTasks,
    faSave,
    faFlagUsa,
    faClipboardCheck,
    faPencilAlt,
    faDownload,
    faAsterisk,
    faSignInAlt,
    faUser,
    faSignOutAlt,
    faInbox,
    faBoxes,
    faStopwatch,
    faSpinner,
    faCheckCircle,
    faFingerprint,
    faClipboard,
    faUserFriends,
    faCar,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret, faChevronRight, faChevronLeft, faChevronUp,
    faChevronDown, faCamera, faTasks, faSave, faFlagUsa, faClipboardCheck,
    faPencilAlt, faDownload, faAsterisk, faSignInAlt, faUser, faSignOutAlt,
    faInbox, faBoxes, faStopwatch, faSpinner, faCheckCircle, faFingerprint,
    faClipboard, faUserFriends, faCar, faArrowRight);


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.prototype.$toastSuccess = {
    title: `Success`,
    variant: 'success',
    autoHideDelay: 1000,
    solid: true
};
Vue.prototype.$toastError = {
    title: `Error`,
    variant: 'danger',
    // autoHideDelay: 1000,
    solid: true
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
