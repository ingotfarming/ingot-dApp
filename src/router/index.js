import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Core from '../views/Core.vue'

import MyAssets from '@/components/MyAssets.vue'
import MyFarm from '@/components/MyFarm.vue'
import Store from '@/components/Store.vue'
import PreSale from '@/components/PreSale.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/App',
    name: 'App',
    component: Core,
    children: [
      {
        path: '',
        component: MyAssets
      },
      {
        path: 'MyAssets',
        component: MyAssets
      },
      {
        path: 'MyFarm',
        component: MyFarm
      },
      {
        path: 'Store',
        component: Store
      },
      {
        path: 'PreSale',
        component: PreSale
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
/*

*/

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
