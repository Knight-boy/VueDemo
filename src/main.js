import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'

Vue.config.productionTip = false

if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
