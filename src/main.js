import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue , BootstrapVueIcons} from 'bootstrap-vue'
import router from './routes';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
