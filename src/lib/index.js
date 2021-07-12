import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'

import App from './components/App.vue'
import store from './store/widgetEvent'

Vue.use(Vuex)
Vue.use(VueRouter)

// @ts-ignore
window._Vue = Vue

export default {
  el: '#app',
  store: new Vuex.Store(store),
  router: new VueRouter({
    mode: 'history'
  }),
  render: h => h(App)
}
