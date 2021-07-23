import Vue from 'vue'

import App from './components/App.vue'
import Login from './components/Login.vue'

Vue.component('Login', Login)

// @ts-ignore
window._Vue = Vue

export default {
  el: '#app',
  render: h => h(App)
}
