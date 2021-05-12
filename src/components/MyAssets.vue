<template>
<div>
    <b-jumbotron :header="header" :lead="lead" fluid=true class="py-4">
      <hr class="my-4">
        <p>Select Assets to transfer</p>
          <b-button-group size="lg">
            <b-button @click="chooseButton()">Choose Assets</b-button>
            <b-button :disabled="!this.casing.buttonChoose" variant="success" @click="transferAsset()">Transfer Assets</b-button>
          </b-button-group>
      </b-jumbotron>
            <UserInfo/>
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
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'MyAssets',
  components: {
    Asset,
    UserInfo
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can find your personal assets NFT1155",
        header:"My Assets",

        nToken: 0,
        pendingReward: 0,
        assets : [],
        casing: {
          type:"MY_ASSETS",
          buttonChoose:false
        },
        nAssetToPool:{}
    }
  },
  computed:{},
  created: async function(){
    this.initAsset();
  },
  methods: {
    initAsset: async function(){
      this.assets = (await this.$contractService.getBalanceOfFamAsset()).filter(function(asset) { return asset.number != 0});
    },
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
    transferAsset: async function(){
        try{
          let result = await this.$contractService.transferAssetToPool(Object.keys(this.nAssetToPool),Object.values(this.nAssetToPool));
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
  buildNumberAssetToTransfer: function(id, num){
    console.log(id, num)
    this.nAssetToPool[id] = num
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
