<template>
<div>
    <b-jumbotron header="My Farm" lead="Select an options" fluid=false>
      <hr class="my-4">
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="chooseButton()">Choose Assets</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="danger"  @click="transferAssetToUser()">Transfer Assets</b-button>
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
