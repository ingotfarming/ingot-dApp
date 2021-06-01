<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4 jumbotron-style">
      </b-jumbotron>
        <UserInfo :balanceWidget="true"/>

    <b-container class="container-asset my-4">
      <div class = "card-header-asset ">
        <h2 class="text-center">My Ingots</h2>
      </div>
      <div class= "card-body-asset">
            <b-row>
            <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
              <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :casing="casing" />
            </div>
             </b-row>
      </div>
    </b-container>

</div>
</template>
<script>

import Asset from '@/components/Asset.vue'
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
        lead: "Here you find your personal assets ingots",
        header:"My Ingots",

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
      await this.$contractServicePromise;
      this.assets = (await this.$contractService.getBalanceOfINGOTAsset()).filter(function(asset) { return asset.number != 0});
      this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
      this.$log.debug(this.powers)
      

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
