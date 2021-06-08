<template>
  <b-modal id="my-pool-transfer" size="xl" title="MyAssets" hide-footer hide-header content-class="container-asset" body-class="py-0 px-0">

      <div class = "card-header-asset ">
        <h2 class="text-center">Select Ingots to retrieve from farming</h2>
        <div class = "text-center my-3">
        </div>
      </div>
      <div v-if="assets.length > 0" class= "card-body-asset">
        <b-row>
          <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
            <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :casing="casing" @nAssetToTransfer="buildNumberAssetToTransfer"/>
          </div>
        </b-row>
      </div>
      <h5 v-else class="text-center py-3 "> You don't have Ingots</h5>
      <div class = "text-center pb-5">
          <b-button size="lg" pill @click="hideModal" class="mr-2">Cancel</b-button>
          <b-button size="lg" pill :disabled="!this.casing.buttonChoose" variant="success"  @click="transferAsset">Confirm</b-button>
      </div>
        
</b-modal>
</template>
<script>

import Asset from '@/components/Asset.vue'
import EventBus from '@/main.js'

export default {
  name: 'MyPoolTransferModal',
  components: {
    Asset
  },
  props: {
  },
  data: function() {
    return {
        assets : [],
        powers : [],
      casing: {
          type:"MY_POOL",
          buttonChoose:true,
          buttonTransfer:false
          },
        nAssetToTransfer:{}
    }
  },
  computed:{},
  created: async function(){
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
      await this.$contractServicePromise;
      this.assets = (await this.$contractService.getAssetInPool()).filter(function(asset) { return asset.number != 0});
      this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
    },
    changeTypeModal: function(type){
      this.casingModal = {
          type: type,
          buttonChoose:true
      }

    },
  
    transferAsset: async function(){
    try{
      let result = await this.$contractService.retrieveFromPool(Object.keys(this.nAssetToTransfer),Object.values(this.nAssetToTransfer));
      this.$log.debug(result)
      if(result){
        this.$Swal.fire('Good job!','Transaction success','success');
        this.initAsset();
        this.$emit("transfer-modal-changed");
        EventBus.$emit('bus-powers-changed');
      }else{
      this.$Swal.fire('Oops','Something went wrong!','error');
      }
    }catch(message){
      this.$log.error(message);
      this.$Swal.fire('Oops','Something went wrong!','error');
    }
  },
  buildNumberAssetToTransfer: function(id, num){
    this.$log.debug(id, num);
    this.nAssetToTransfer[id] = num;
    this.unlockButton();
  },
  unlockButton: function(){
    if(Object.values(this.nAssetToTransfer).reduce((a, b) => a + b, 0) > 0){
      this.casing.buttonTransfer = true;
    }else{
      this.casing.buttonTransfer = false;
    }
  },
    hideModal() {
          this.$bvModal.hide("my-pool-transfer")
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
