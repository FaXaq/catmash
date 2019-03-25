import Vue from 'vue';
import App from './App.vue';
import router from './router';
import dotenv from 'dotenv';
import '@/assets/scss/main.scss';

dotenv.config();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
