<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4 jumbotron-style"></b-jumbotron>
    <UserInfo :balanceWidget="true"/>
    
    <b-container class="container-asset my-4">
      <div class = "card-header-asset ">
        <h2 class="text-center">Select Ingots to buy</h2>
        <div class = "text-center my-3">
            <b-button size="lg" :disabled="!this.storeIsOpen" pill @click="approveAsset()" class="mr-2">1. Approve</b-button>
            <b-button size="lg" :disabled="!this.storeIsOpen" pill variant="success"  @click="transferAsset()">2. Buy</b-button>
        </div>
        <div class="d-flex justify-content-center">
          <h6 class="text-center mr-4">Total Price: {{totalPrice}}</h6>
          <h6 class="text-center">Store <span v-if="storeIsOpen">Open</span><span v-else>Closed</span></h6>
        </div>
      </div>
      <div class= "card-body-asset">

            <b-row>
            <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
              <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :maxAllowed="maxAllowed[index]"  :mined="mined[index]"  :price="prices[index]" :casing="casing" @nAssetToTransfer="buildNumberAssetToTransfer"/>
            </div>
             </b-row>

      </div>
    </b-container>


</div>
</template>

<script>
import Asset from '@/components/Asset.vue'
import UserInfo from '@/components/UserInfo.vue'
import EventBus from '@/main.js'


export default {
  name: 'Store',
  components: {
    Asset,
    UserInfo
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can buy Ingots",
        header:"Store",
        assets : [],
        powers : [],
        maxAllowed : [],
        mined : [],
        prices : [],
        casing: {
          type:"STORE",
          buttonChoose:false},
        nAssetToUser : {},
        priceForId : {},
        totalPrice :0,
        storeIsOpen :false
    }
  },
  computed:{},
  created: function(){
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
        this.assets = await this.$contractService.getNFTs()
        await this.$contractServicePromise;
        this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
        this.maxAllowed = (await this.$contractService.getAssetMaxMintingBatch(this.assets.map(asset => asset.id)));
        this.mined = (await this.$contractService.getAssetCurrMintingBatch(this.assets.map(asset => asset.id)));
        this.prices = (await this.$contractService.getPriceFromStore(this.assets.map(asset => asset.id)));
        this.storeIsOpen = (await this.$contractService.getisStoreOpen());
    },
    transferAsset: async function(){
    try{
      let result = await this.$contractService.buyBatchFromStore(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser));
      this.$log.debug(result)
      if(result){
        this.$Swal.fire('Good job!','Transaction success','success');
        this.mined = (await this.$contractService.getAssetCurrMintingBatch(this.assets.map(asset => asset.id)));
        EventBus.$emit('bus-tokens-changed');
      }else{
      this.$Swal.fire('Oops','Something went wrong!','error');
      }
    }catch(message){
      this.$log.error(message);
      this.$Swal.fire('Oops','Something went wrong!','error');
    }
  },

    approveAsset: async function() {
      try{
        let result = await this.$contractService.approveTransferToStore(this.totalPrice);
        this.$log.debug(result)
        if(result){
          this.$Swal.fire('Good job!','Transaction success','success');
        }else{
        this.$Swal.fire('Oops','Something went wrong!','error');
        }
      }catch(message){
        this.$log.error(message);
        this.$Swal.fire('Oops','Something went wrong!','error');
      }
    },

  buildNumberAssetToTransfer: function(id, num, price){
    this.$log.debug(id, num, price);

    this.nAssetToUser[id] = num
    this.priceForId[id] = price
    this.updateTotalPrice();
    

  },
  updateTotalPrice: function(){
    this.totalPrice = 0;
    for(const key in this.nAssetToUser ){
      this.totalPrice+= this.nAssetToUser[key] * this.priceForId[key] 
      }
    this.$log.debug(this.totalPrice);
    },
  buyTokens: function(amounts){
    this.$log.debug(amounts)
    this.$contractService.buyTokens(amounts);

  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Start Header */


.eqGhLO {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(118, 69, 217);
}

.KsMbG {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.1;
}
.grfoLI {
    color: rgb(122, 110, 170);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}

.fZxzxc {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 20px;
    background-color: rgb(250, 249, 250);
    z-index: 1;
}
.dtTmUC {
    border-radius: 16px;
    background-color: rgb(238, 234, 244);
    box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
}
.htcbg {
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(69, 42, 122);
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.75rem 1rem 0px;
}
.fTMjUf {
    -webkit-box-pack: justify;
    justify-content: space-between;
}
</style>
