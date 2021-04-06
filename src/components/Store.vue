<template>
<div>
    <b-jumbotron :header="header" :lead="lead" fluid=false class="py-4">
      <hr class="my-4">
      <b-row><b-col>
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="approveAsset()" >Approve</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="success"  @click="transferAsset()">Transfer Assets</b-button>
          </b-button-group>
        </b-col>
        </b-row>
      </b-jumbotron>

        <b-container class="my-4">
              <b-row>
              <b-card-group deck >
                <div class="col-md-4" :key="asset.id" v-for="asset in assets">
                <Asset :asset="asset"  :id="asset.id" :numberAsset="asset.number" :casing="casing" @nAssetToTransfer="buildNumberAssetToTransfer"/>
            </div>   
              </b-card-group>
            </b-row>
    </b-container>
</div>
</template>

<script>
import Asset from './Asset.vue'

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
        header:"Store",
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
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
        this.assets = await this.$contractService.getNFTs()
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
    console.log(amounts)
    this.$contractService.buyTokens(amounts);

  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
