<template>
  <b-card no-body class= "h-100"  v-bind:img-src='require("@/assets/NFT/"+this.id+".jpg")' img-alt="Image" img-top>
    <b-card-body>
      <b-card-title>{{name}}</b-card-title>
      
      <b-card-text>{{text}}</b-card-text>
      <h5 class="d-flex justify-content-between align-items-center mb-3" >
        <span class="text-muted" >Power</span>
        <b-badge pill variant="warning">{{power}}</b-badge>
      </h5>

        <div v-if="casing.type === 'MY_ASSETS' || casing.type === 'MY_POOL' ">
        <h5 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your Asset</span>
          <span class="badge badge-secondary badge-pill">{{numberAsset}}</span>
        </h5>
      </div>
          

      <!-- STORE-->
      <div v-if="casing.type === 'STORE'">
        <h5 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Price</span>
          <span class="badge badge-secondary badge-pill">{{price}}</span>
        </h5>
        <h5 class="d-flex justify-content-between align-items-center">
          <span class="text-muted">Remaining</span>
          <span class="badge badge-secondary badge-pill">{{minedNfts}}/{{maxAmountNfts}}</span>
        </h5>
        </div>
    </b-card-body>
  
    <!-- MY_ASSETS-->  <!-- MY_POOL-->  <!-- STORE-->
    <div v-if=" (casing.type === 'STORE') || ((casing.type === 'MY_ASSETS' || casing.type === 'MY_POOL') && casing.buttonChoose===true)">
      <b-card-footer>
      <h5 class="d-flex  justify-content-between align-items-center">
        <span class="text-muted" v-if="casing.type === 'MY_ASSETS' || casing.type === 'MY_POOL'">Transfer</span>
        <span class="text-muted" v-if="casing.type === 'STORE'">Buy</span>
        <b-form-spinbutton id="sb-inline" v-model="numberAssetSelected" inline min="0" max="100" @input="$emit('nAssetToTransfer', id, numberAssetSelected, price)"></b-form-spinbutton>
      </h5>
      </b-card-footer>
    </div>

  </b-card>
</template>

<script>
export default {
  name: 'Asset',
  props: {
    asset: Object,
    id: Number,
    numberAsset: Number,
    casing: Object
  },
  data: function() {
    return {
      //id: this.asset.id,
      //numberAsset: this.asset.number,
      name : this.$contractService.getNFTs()[this.id].name,
      text : this.$contractService.getNFTs()[this.id].text,
      power: this.$contractService.getNFTs()[this.id].power,
      price: this.$contractService.getNFTs()[this.id].price,
      minedNfts : 0,
      maxAmountNfts: 0,

      numberAssetSelected:0,

    }
  },
  computed:{
  },
  created: async function(){
    this.price =  await this.$contractService.getPrice(this.id);
    console.log("getPrice:",this.id, this.price )
    this.power =  await this.$contractService.getPower(this.id);
    console.log("getPower:",this.id, this.power )

    this.minedNfts = await this.$contractService.getMinedNft(this.id);
    this.maxAmountNfts = await this.$contractService.getMaxAmountAllowedNft(this.id);

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
