import Vue from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';

import router from './routes/'

import './assets/css/style.scss'
import './assets/css/style.css'
import './assets/css/simple-grid.css'
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

Vue.config.productionTip = false

Vue.filter('truncate', function (text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  } else {
    return text;
  }
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
