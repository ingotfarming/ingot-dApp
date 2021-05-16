<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4">
      </b-jumbotron>
        <UserInfo/>

     <b-container class="container-asset my-4 p-3 px-5">
      <div>
        <h2 class="text-center">My Assets</h2>
      </div>
      <hr>
      <div>
          <div>
            <b-row>
            <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
              <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :casing="casing" />
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

        assets : [],
        powers : [],
        casing: {
          type:"MY_ASSETS",
          buttonChoose:false
        },
    }
  },
  computed:{},
  created: async function(){
    this.initAsset();
  },
  methods: {
    initAsset: async function(){
      this.assets = (await this.$contractService.getBalanceOfFamAsset()).filter(function(asset) { return asset.number != 0});
      this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
      console.log(this.powers)
      

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
