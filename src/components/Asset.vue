<template>
    <b-card v-bind:title=name v-bind:img-src='require("@/assets/NFT/"+this.id+".jpg")' img-alt="Image" img-top>
      <b-card-text>{{text}}</b-card-text>
          <h5 class="d-flex justify-content-between align-items-center mb-3" >
            <span class="text-muted" >Power</span>
            <b-badge pill variant="warning">{{power}}</b-badge>
          </h5>
          
                
                  <!-- MY_ASSETS-->
                  <div v-if="casing.type === 'MY_ASSETS'">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Your Asset</span>
                      <span class="badge badge-secondary badge-pill">{{numberAsset}}</span>
                    </h5>
                   <div v-if="casing.type === 'MY_ASSETS' && casing.buttonChoose===true">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Transfer to Pool</span>
                      <b-form-spinbutton id="sb-inline" v-model="numberAssetToPool" inline min="0" max="100" @input="$emit('nAssetToPool', id, numberAssetToPool)"></b-form-spinbutton>
                    </h5>
                  </div>
                   </div>
                   <!-- MY_POOL-->
                     <div v-if="casing.type === 'MY_POOL'">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Your Asset</span>
                      <span class="badge badge-secondary badge-pill">{{numberAsset}}</span>
                    </h5>
                   <div v-if="casing.type === 'MY_POOL' && casing.buttonChoose===true">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Transfer to Pool</span>
                      <b-form-spinbutton id="sb-inline" v-model="numberAssetToUser" inline min="0" max="100" @input="$emit('nAssetToUser', id, numberAssetToUser)"></b-form-spinbutton>
                    </h5>
                  </div>
                   </div>


    </b-card>
</template>

<script>
import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();
export default {
  name: 'Asset',
  props: {
    asset: Object,
    casing: Object
  },
  data: function() {
    return {
      id: this.asset.id,
      name : contractsServices.getNFTMetaData()[this.asset.id].name,
      text : contractsServices.getNFTMetaData()[this.asset.id].text,
      power: contractsServices.getNFTMetaData()[this.asset.id].power,
      
      numberAsset: this.asset.number,
      
      numberAssetToPool:0,

      numberAssetToUser: 0

    }
  },
  computed:{
  },
  created: function(){
  },
  methods: {
    nAssetToPool: function(value){
      console.log(value)
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
