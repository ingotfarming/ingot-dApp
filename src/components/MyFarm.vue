<template>
<div>
    <b-jumbotron :header="header" :lead="lead" fluid=false class="py-4">
      <hr class="my-4">
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="chooseButton()">Choose Assets</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="success" @click="transferAsset()">Transfer Assets</b-button>
          </b-button-group>
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

export default {
  name: 'MyFarm',
  components: {
    Asset,
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can find your assets NFT1155 in staking",
        header:"My Pool",
        assets : [],
        casing: {
          type:"MY_POOL",
          buttonChoose:false},
          nAssetToUser : {}
    }
  },
  computed:{},
  created: async function(){
      this.assets = (await this.$contractService.getAssetInPool()).filter(function(asset) { return asset.number != 0});
  },
  methods: {
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
    transferAsset: async function(){
      console.log(this.nAssetToPool)
      this.$contractService.retrieveFromPool(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser))
  },
  buildNumberAssetToTransfer: function(id, num){
    console.log(id, num)
    this.nAssetToUser[id] = num
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
