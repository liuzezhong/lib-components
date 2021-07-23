import Login from './components/auth/Login';
import App from './components/App.vue';
import Vue from 'vue';

Vue.component('Login', Login);

// @ts-ignore
window._Vue = Vue;

export default {
    el: '#app',
    render: h => h(App)
};
