<template>
<div>
    <b-jumbotron :header="header" :lead="lead" fluid=false class="py-4">
      <hr class="my-4">
      <b-row><b-col>
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="chooseButton()">Choose Assets</b-button>
            <b-button @click="approveAsset()">Approve</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="danger"  @click="transferAsset()">Transfer Assets</b-button>
          </b-button-group>
        </b-col>
         <b-col>
           <p>Buy Token From ETH</p>
           <b-form-input v-model="ETHforBuy" :id="buyInput" type="number" size="sm"></b-form-input>
           <b-button-group size="sm">
              <b-button @click="buyTokens()">Buy</b-button>
            </b-button-group>
           </b-col>
        </b-row>
      </b-jumbotron>

        <b-container class="my-4">
              <b-row>
              <b-card-group deck >
                <div class="col-md-4" :key="asset.id" v-for="asset in assets">
                <Asset :asset="asset" :casing="casing" @nAssetToTransfer="buildNumberAssetToTransfer"/>
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
  name: 'Store',
  components: {
    Asset,
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can find your assets NFT1155 in staking",
        header:"My Store",
        assets : [],
        casing: {
          type:"STORE",
          buttonChoose:false},
        nAssetToUser : {},
        priceForId : {},
        totalPrice :0
    }
  },
  computed:{},
  created: function(){
      this.assets = contractsServices.getNFTMetaData()
      console.log(this.assets)
  },
  methods: {
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
    approveAsset: async function() {

      contractsServices.approveTransferToStore(this.totalPrice);
    },
    transferAsset: async function(){
      await contractsServices.approveTransferToStore(1);
      console.log(this.nAssetToPool)
      contractsServices.buyBatchFromStore(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser))
  },
  buildNumberAssetToTransfer: function(id, num, price){
    if(num>0){
    console.log(id, num, price)
    this.nAssetToUser[id] = num
    this.priceForId[id] = price
    this.updateTotalPrice();
    }

  },
  updateTotalPrice: function(){
    this.totalPrice = 0;
    for(const key in this.nAssetToUser ){
      this.totalPrice+= this.nAssetToUser[key] * this.priceForId[key] 
      }
    console.log(this.totalPrice);
    },
  buyTokens: function(amounts){
    contractsServices.buyTokens(amounts);

  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
