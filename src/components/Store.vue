<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4"></b-jumbotron>
    <UserInfo/>
    
    <b-container class="container-asset my-4 p-3 px-5">
      <div>
        <h2 class="text-center">Select Assets to buy</h2>
        <div class = "text-center my-3">
            <b-button size="lg" pill @click="approveAsset()" class="mr-2">Approve</b-button>
            <b-button size="lg" pill :disabled="!this.casing.buttonChoose" variant="success"  @click="transferAsset()">Buy</b-button>
        </div>
        <h6 class="text-center">Total Price: {{totalPrice}}</h6>
      </div>
      <hr>
      <div>
          <div>
            <b-row>
            <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
              <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :maxAllowed="maxAllowed[index]"  :mined="mined[index]"  :price="prices[index]" :casing="casing"  @nAssetToTransfer="buildNumberAssetToTransfer"/>
            </div>
             </b-row>
          </div>
      </div>
    </b-container>


</div>
</template>

<script>
import Asset from './Asset.vue'
import UserInfo from '@/components/UserInfo.vue'

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
        lead: "Here you can find your assets NFT1155 in staking",
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
        totalPrice :0
    }
  },
  computed:{},
  created: function(){
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
        this.assets = await this.$contractService.getNFTs()
        this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
        this.maxAllowed = (await this.$contractService.getAssetMaxMintingBatch(this.assets.map(asset => asset.id)));
        this.mined = (await this.$contractService.getAssetCurrMintingBatch(this.assets.map(asset => asset.id)));
        this.prices = (await this.$contractService.getPriceFromStore(this.assets.map(asset => asset.id)));

    },
    transferAsset: async function(){
    try{
      let result = await this.$contractService.buyBatchFromStore(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser));
      this.$log.debug(result)
      if(result){
        this.$Swal.fire('Good job!','You clicked the button!','success');
      }else{
      this.$Swal.fire('Oops','Something went wrong!','error');
      }
    }catch(message){
      this.$log.error(message);
      this.$Swal.fire('Oops','Something went wrong!','error');
    }finally{
        this.initAsset();
    }
  },

    approveAsset: async function() {
      this.casing.buttonChoose = !this.casing.buttonChoose
      this.$contractService.approveTransferToStore(this.totalPrice);
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
    console.log(this.totalPrice);
    },
  buyTokens: function(amounts){
    console.log(amounts)
    this.$contractService.buyTokens(amounts);

  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
