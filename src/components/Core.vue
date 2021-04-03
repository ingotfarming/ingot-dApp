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
          this.nToken = await this.$contractService.getBalanceOfFamToken();
          await this.$contractService.getBalanceOfFamAsset();
 
          await this.$contractService.getAssetInPool();
          await this.$contractService.getPowerInPool();  
          await this.$contractService.getStimateRewardPool();      
      },
      getAllAsset: async function() {
          await this.$contractService.getBalanceOfFamAsset();
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

