window.Vue = require('vue');
window.axios = require('axios');
import Notifications from 'vue-notification'
Vue.use(Notifications)

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
