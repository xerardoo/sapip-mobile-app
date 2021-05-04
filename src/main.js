import Vue from 'vue'
import App from './App.vue'
import wb from "./registerServiceWorker"
import axios from 'axios'
import router from './router'
import store from './store'
import moment from "moment"

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es';


import {BootstrapVue} from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/util.css';

import VueMoment from 'vue-moment'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {
    faArrowRight,
    faAsterisk,
    faBoxes,
    faCamera,
    faCar,
    faCheckCircle,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faClipboard,
    faClipboardCheck,
    faDownload,
    faFingerprint,
    faFlagUsa,
    faInbox,
    faPencilAlt,
    faPlus,
    faSave,
    faSignInAlt,
    faSignOutAlt,
    faSpinner,
    faStopwatch,
    faTasks,
    faUser,
    faUserFriends,
    faUserSecret,
    faFilter,
} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faChevronRight, faChevronLeft, faChevronUp,
    faChevronDown, faCamera, faTasks, faSave, faFlagUsa, faClipboardCheck,
    faPencilAlt, faDownload, faAsterisk, faSignInAlt, faUser, faSignOutAlt,
    faInbox, faBoxes, faStopwatch, faSpinner, faCheckCircle, faFingerprint,
    faClipboard, faUserFriends, faCar, faArrowRight, faPlus, faFilter);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('date-picker', DatePicker);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

Vue.config.productionTip = false;

if (window.location.hostname !== 'localhost' && window.location.hostname !== '192.168.0.121')
    axios.defaults.baseURL = location.protocol + '//' + window.location.host + '/v1';
else
    axios.defaults.baseURL = location.protocol + '//' + window.location.hostname + ':8091/v1/';

Vue.prototype.$workbox = wb;
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

Vue.mixin({
    methods: {
        dateToLocal(date) {
            return moment.utc(date).local().format('D/MM/YY h:mm a');
        },
    },
});
Vue.filter('rounded', function (value, decimals) {
    if (!value) value = 0;
    if (!decimals) decimals = 0;
    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
