<template>
<div>
    <b-jumbotron :header="header" :lead="lead" fluid=false class="py-4">
      </b-jumbotron>
      <UserInfo/>
    <b-container class="container-asset my-4 p-3 px-5">
      <div>
        <h2 class="text-center">Select Assets to transfer</h2>
        <div class = "text-center my-3">
            <b-button size="lg" pill @click="chooseButton()" class="mr-2">Choose Assets</b-button>
            <b-button size="lg" pill :disabled="!this.casing.buttonChoose" variant="success"  @click="transferAsset()">Transfer Assets</b-button>
        </div>
      </div>
      <hr>
      <div>
          <div>
            <b-row>
            <div class="col-md-3 px-2 mb-3" :key="asset.id" v-for="asset in assets">
              <Asset :asset="asset"  :id="asset.id" :numberAsset="asset.number" :casing="casing" @nAssetToTransfer="buildNumberAssetToTransfer"/>
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
  name: 'MyFarm',
  components: {
    Asset,
    UserInfo
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
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
      this.assets = (await this.$contractService.getAssetInPool()).filter(function(asset) { return asset.number != 0});
    },
    chooseButton: function(){
      this.casing.buttonChoose = !this.casing.buttonChoose
      console.log(this.casing.buttonChoose)
    },
  
    transferAsset: async function(){
    try{
      let result = await this.$contractService.retrieveFromPool(Object.keys(this.nAssetToUser),Object.values(this.nAssetToUser));
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
    this.nAssetToUser[id] = num
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
