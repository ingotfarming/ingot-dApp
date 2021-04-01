import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import MyAssets from '@/components/MyAssets.vue'
import MyPool from '@/components/MyPool.vue'
import Store from '@/components/Store.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
        path: 'MyPool',
        component: MyPool
      },
      {
        path: 'Store',
        component: Store
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