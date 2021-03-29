<template>
  <div>
    <UserInfo/>
    <router-view/>  
  </div>
</template>
<script>

import UserInfo from './UserInfo.vue'
/*
import MyAssets from './MyAssets.vue'
import MyPool from './MyPool.vue'
import MyStore from './MyStore.vue'
*/

import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();

export default {
  name: 'Core',
  components: {
    UserInfo
  },
  props: {
    msg: String
  },
  data: function() {
    return {

    }
  },
  computed:{},
  created:{},
  methods: {
      claim: async function(){

      },
      getBalance: async function() {
          this.nToken = await contractsServices.getBalanceOfFamToken();
          await contractsServices.getBalanceOfFamAsset();
 
          await contractsServices.getAssetInPool();
          await contractsServices.getPowerInPool();  
          await contractsServices.getStimateRewardPool();      
      },
      getAllAsset: async function() {
          await contractsServices.getBalanceOfFamAsset();
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

