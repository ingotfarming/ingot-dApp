<template>
  <b-card no-body class= "h-100 box-shadow border-0"  v-bind:img-src='require("@/assets/NFT/"+this.id+".png")' img-alt="Image" img-top>
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
          <span class="badge badge-secondary badge-pill">{{number}}</span>
        </h5>
      </div>
          

      <!-- STORE-->
      <div v-if="casing.type === 'STORE'">
        <h5 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Price</span>
          <span class="badge badge-secondary badge-pill">{{price}}</span>
        </h5>
        <h5 class="d-flex justify-content-between align-items-center">
          <span class="text-muted">Mined</span>
          <span class="badge badge-secondary badge-pill">{{mined}}/{{maxAllowed}}</span>
        </h5>
        </div>
    </b-card-body>
  
    <!-- MY_ASSETS-->  <!-- MY_POOL-->  <!-- STORE-->
    <div v-if=" (casing.type === 'STORE') || ((casing.type === 'MY_ASSETS' || casing.type === 'MY_POOL') && casing.buttonChoose===true)">
      <b-card-footer class="border-0">
      <h5 class="d-flex  justify-content-between align-items-center">
        <span class="text-muted" v-if="casing.type === 'MY_ASSETS' || casing.type === 'MY_POOL'">Transfer</span>
        <span class="text-muted" v-if="casing.type === 'STORE'">Buy</span>
        
        <b-form-spinbutton id="sb-inline" v-model="numberSelected" inline min=0 :max="maxElementsAllowed()" @input="$emit('nAssetToTransfer', id, numberSelected, price)"></b-form-spinbutton>
      </h5>
      </b-card-footer>
    </div>

  </b-card>
</template>

<script>
export default {
  name: 'Asset',
  props: {
    //asset: Object,
    id: Number,
    number : { type: Number, default: 0 },
    power : { type: Number, default: 0 },
    price : { type: Number, default: 0 },
    mined : { type: Number, default: 0 },
    maxAllowed : { type: Number, default: 0 },
    casing: Object,

  },
  data: function() {
    return {
      name : this.$contractService.getNFTs()[this.id].name,
      numberSelected: 0
    }
  },
  computed:{
  },
  created: async function(){
    this.$log.debug("TYPE ASSETS: ", this.casing.type);

    if(this.power === 0){
      await this.$contractServicePromise;
      this.power = this.$contractService.getNFTs()[this.id].power;
      this.price = this.$contractService.getNFTs()[this.id].price;
      this.maxAllowed = this.$contractService.getNFTs()[this.id].maxAllowed;
    }
  },
  methods: {
    maxElementsAllowed(){
      if(this.casing.type === 'STORE'){
        return this.maxAllowed-this.mined;
      }
      return this.number;
    }
  },
    watch: {
      mined: function () {
        this.numberSelected = 0;
      },
      number: function () {
        this.numberSelected = 0;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.rounded-circle {
    border-radius: 50%!important;
}

</style>
