import Vue from 'vue'
import VueRouter from 'vue-router'


import MyAssets from '@/views/MyAssets.vue'
import MyFarm from '@/views/MyFarm.vue'
import Store from '@/views/Store.vue'
import MyFarmLP from '@/views/MyFarmLP.vue'

//import PrivateSale from '@/views/PrivateSale.vue'


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
    path: '/FarmingLP',
    component: MyFarmLP
  },
  {
    path: '/Store',
    component: Store
  }
]
/*

*/

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active"
})


export default router
