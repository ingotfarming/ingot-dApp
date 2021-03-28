<template>
<div>
      <b-row>
      <b-col lg="4" class="pb-2"/>
      <b-col lg="2" class="pb-2"><b-button pill variant="primary" @click="chooseButton()">Choose</b-button></b-col>
      <b-col lg="2" class="pb-2"><b-button pill variant="danger" v-if="this.casing.buttonChoose" @click="transferAssetToUser()">Transfer</b-button></b-col>
      <b-col lg="4" class="pb-2"/>
      </b-row>

<div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4" :key="asset.id" v-for="asset in assets">
                <Asset :asset="asset" :casing="casing" @nAssetToUser="buildNumberAssetToUser"/>
            </div>    
          </div>
        </div>
  </div>
</div>
</template>
<script>
import Asset from './Asset.vue'

import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();

export default {
  name: 'MyPool',
  components: {
    Asset,
  },
  props: {

  },
  data: function() {
    return {
        assets : [],
        casing: {
          type:"MY_POOL",
          buttonChoose:false},
          nAssetToUser : {}
    }
  },
  computed:{},
  created: async function(){
      this.assets = (await contractsServices.getAssetInPool()).filter(function(asset) { return asset.number != 0});
  },
  methods: {
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
    transferAssetToUser: async function(){
      console.log(this.nAssetToPool)
      contractsServices.retrieveFromPool(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser))
  },
  buildNumberAssetToUser: function(id, num){
    console.log(id, num)
    this.nAssetToUser[id] = num
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
