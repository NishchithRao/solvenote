import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueQuill from 'vue-quill';

Vue.config.productionTip = false
Vue.use(VueQuill)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
