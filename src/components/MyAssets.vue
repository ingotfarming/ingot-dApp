<template>
<div>
    <b-jumbotron header="My Farm" lead="Select an options" fluid=false>
      <hr class="my-4">
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="chooseButton()">Choose Assets</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="danger"  @click="transferAsset()">Transfer Assets</b-button>
          </b-button-group>
      </b-jumbotron>

        <b-container >
              <b-row>
              <b-card-group deck>
                <div class="col-md-4" :key="asset.id" v-for="asset in assets">
                <Asset :asset="asset" :casing="casing" @nAssetToPool="buildNumberAssetToPool"/>
            </div>   
              </b-card-group>
            </b-row>
    </b-container>
</div>
</template>
<script>
import Asset from './Asset.vue'

import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();

export default {
  name: 'MyAssets',
  components: {
    Asset,
  },
  props: {

  },
  data: function() {
    return {
        nToken: 0,
        pendingReward: 0,
        assets : [],
        casing: {
          type:"MY_ASSETS",
          buttonChoose:false},
        
        nAssetToPool:{}
    }
  },
  computed:{},
  created: async function(){
      this.assets = (await contractsServices.getBalanceOfFamAsset()).filter(function(asset) { return asset.number != 0})
  },
  methods: {
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
    transferAsset: async function(){
      console.log(this.nAssetToPool)
      contractsServices.transferAssetToPool(Object.keys(this.nAssetToPool),Object.values(this.nAssetToPool))
  },
  buildNumberAssetToPool: function(id, num){
    console.log(id, num)
    this.nAssetToPool[id] = num
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
