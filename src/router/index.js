import Vue from 'vue'
import VueRouter from 'vue-router'


import MyAssets from '@/views/MyAssets.vue'
import MyFarm from '@/views/MyFarm.vue'
import Store from '@/views/Store.vue'
import PreSale from '@/views/PreSale.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Store',
    component: Store,
  },
  {
    path: '/MyIngots',
    component: MyAssets
  },
  {
    path: '/Farming',
    component: MyFarm
  },
  {
    path: '/Store',
    component: Store
  },
  {
    path: '/PreSale',
    component: PreSale
  }
]
/*

*/

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active"
})

export default router
