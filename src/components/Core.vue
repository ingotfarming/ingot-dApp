<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      A place where you can stake your favourite farm asset!
    </p>
    <UserInfo/>
    <h3>My Farm</h3>


<div>
      <b-nav card-header pills align="center">
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Inactive</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <b-button variant="primary">Go somewhere</b-button>
</div>


    <div >
      <b-tabs content-class="mt-3"  align="center">
        <b-tab title="My Free Assets" active><MyAssets/></b-tab>
        <b-tab title="My Pool"><MyPool/></b-tab>
        <b-tab title="Store" ><MyStore/></b-tab>
      </b-tabs>
    </div>
    
    
  </div>
</template>
<script>
import UserInfo from './UserInfo.vue'
import MyAssets from './MyAssets.vue'
import MyPool from './MyPool.vue'
import MyStore from './MyStore.vue'


import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();

export default {
  name: 'Core',
  components: {
    UserInfo,
    MyAssets,
    MyPool,
    MyStore
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

