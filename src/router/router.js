import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import {routerMode} from '../config/env'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');

Vue.use(Router)

export default new Router({
  routes : [
    {
      path : '/',
      // name : 'TodoList',
      component : App,
      children: [
      	{
      		path: '',
      		redirect: '/home'
      	},
      	{
      		path: '/home',
      		component: home
      	},
      	{
      		path: '/city/:cityid',
      		component: city
      	}
      ]
    }
  ],
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
  	if(savedPosition) {
  		return savedPosition
  	} else {
  		if(from.meta.keepAlive) {
  			from.meta.savedPosition = document.body.scrollTop;
  		}
  		return { x: 0, y: to.meta.savedPosition || 0}
  	}
  }
})
