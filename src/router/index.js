import Vue from 'vue'
import vueRouter from 'vue-router'

var page1 = () => import('components/page1')
// var page1 = () => import('components/page1_slice')
var page2 = () => import('components/page2')
var page3 = () => import('components/page3')
var page4 = () => import('components/page4')
Vue.use(vueRouter)
var routes = [
  {
    path: '/',
    redirect: '/location',
  },
  {
    name: 'location',
    path: '/location',
    component: page1
  },
  {
    name: 'resource',
    path: '/resource',
    component: page2
  },
  {
    name: 'fromTo',
    path: '/fromTo',
    component: page3
  },
  {
    name: 'visulization',
    path: '/visulization',
    component: page4
  },
];
const router = new vueRouter({
  routes,
  mode: 'history',
  // base: '/medical-resource/'
})

export default router