<template>
    <b-card v-bind:title=name v-bind:img-src='require("@/assets/NFT/"+this.id+".jpg")' img-alt="Image" img-top>
      <b-card-text>{{text}}</b-card-text>
          <h5 class="d-flex justify-content-between align-items-center mb-3" >
            <span class="text-muted" >Power</span>
            <b-badge pill variant="warning">{{power}}</b-badge>
          </h5>
           
           <div v-if="casing.type === 'MY_ASSETS' ||casing.type === 'MY_POOL' ">
           <h5 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your Asset</span>
            <span class="badge badge-secondary badge-pill">{{numberAsset}}</span>
          </h5>
          </div>
          
                
                  <!-- MY_ASSETS-->
                   <div v-if="casing.type === 'MY_ASSETS' && casing.buttonChoose===true">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Transfer to Pool</span>
                      <b-form-spinbutton id="sb-inline" v-model="numberAssetSelected" inline min="0" max="100" @input="$emit('nAssetToTransfer', id, numberAssetSelected, price)"></b-form-spinbutton>
                    </h5>
                  </div>
                   <!-- MY_POOL-->
                   <div v-if="casing.type === 'MY_POOL' && casing.buttonChoose===true">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Transfer to Pool</span>
                      <b-form-spinbutton id="sb-inline" v-model="numberAssetSelected" inline min="0" max="100" @input="$emit('nAssetToTransfer', id, numberAssetSelected, price)"></b-form-spinbutton>
                    </h5>
                  </div>

                   <!-- STORE-->
                   <div v-if="casing.type === 'STORE'">
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Price</span>
                      <span class="badge badge-secondary badge-pill">{{price}}</span>
                  </h5>
                    <h5 class="d-flex justify-content-between align-items-center mb-3">
                      <span class="text-muted">Transfer to Pool</span>
                      <b-form-spinbutton id="sb-inline" v-model="numberAssetSelected" inline min="0" max="100" @input="$emit('nAssetToTransfer', id, numberAssetSelected, price)"></b-form-spinbutton>
                    </h5>
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
      numberAsset: this.asset.number,
      name : contractsServices.getNFTMetaData()[this.asset.id].name,
      text : contractsServices.getNFTMetaData()[this.asset.id].text,
      power: contractsServices.getNFTMetaData()[this.asset.id].power,
      price: contractsServices.getNFTMetaData()[this.asset.id].price,
      
      numberAssetSelected:0,

    }
  },
  computed:{
  },
  created: function(){
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
