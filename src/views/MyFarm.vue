<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4 jumbotron-style">
        <b-nav align="center " class="mt-4 nav-bar mx-auto" >
    <b-nav-item  class="nav-item nav-item-link" active-class="nav-item-active" link-classes="nav-item-link" to="/Farming">Ingot LP</b-nav-item>
    <b-nav-item disabled class="nav-item nav-item-link-disabled " active-class="nav-item-active" link-classes="nav-item-link">{{nameExchange}} LP</b-nav-item>
  </b-nav>
      </b-jumbotron>
      <UserInfo :balanceWidget="true" :poolPowerWidget="true" :rewardWidget="true"/>
      <div>


</div>
    <b-container class="container-asset my-4">
      <div class = "card-header-asset ">
        <h2 class="text-center">My farming Ingots</h2>
        <div class = "text-center my-3">
            <b-button v-b-modal.my-pool-transfer size="lg" pill class="mr-2">Retrieve my Ingot</b-button>
            <b-button v-b-modal.my-assets-transfer size="lg" pill class="mr-2">Transfer my Ingot</b-button>
          <MyAssetsTransferModal @transfer-modal-changed="initAsset"/>
          <MyPoolTransferModal @transfer-modal-changed="initAsset"/>
        </div>
      </div>
      <div v-if="assets.length > 0" class= "card-body-asset">
        <b-row>
          <div class="col-md-3 px-2 mb-3" :key="index" v-for="(asset, index) in assets">
            <Asset :id="asset.id" :number="asset.number" :power="powers[index]" :casing="casing" />
          </div>
        </b-row>
      </div>
      <h5 v-else class="text-center py-3 "> You don't have Ingots</h5>
    </b-container>

</div>
</template>


<script>
import Asset from '@/components/Asset.vue'
import UserInfo from '@/components/UserInfo.vue'
import MyAssetsTransferModal from '@/components/modals/MyAssetsTransferModal.vue'
import MyPoolTransferModal from '@/components/modals/MyPoolTransferModal.vue'

export default {
  name: 'MyFarm',
  components: {
    Asset,
    UserInfo,
    MyAssetsTransferModal,
    MyPoolTransferModal
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can farm your personal ingots",
        header:"Farming",
        
        powers : [],
        assets : [],
        casing: {
          type:"MY_POOL",
          buttonChoose:false,
          buttonTransfer:false
          }
    }
  },
  computed:{
    nameExchange: function () {
        return process.env.VUE_APP_EXCHANGE_NAME;
      },
  },
  created: async function(){
      this.initAsset();
  },
  methods: {
    initAsset: async function(){
      await this.$contractServicePromise;
      this.assets = (await this.$contractService.getAssetInPool()).filter(function(asset) { return asset.number != 0});
      this.powers = (await this.$contractService.getAssetPowerBatch(this.assets.map(asset => asset.id)));
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* NAV */
.nav-bar {
    background-color: rgb(238, 234, 244);
    border-radius: 16px;
    max-width: fit-content;
}
.jqeYiC a {
    padding-left: 12px;
    padding-right: 12px;
}

.nav-item-active {
    -webkit-box-align: center !important;
    align-items: center !important;
    border: 0px !important;
    border-radius: 16px !important;
    box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset !important;
    cursor: pointer;
    font-family: inherit !important;
    font-weight: 600 !important;
    -webkit-box-pack: center !important;
    justify-content: center !important;
    letter-spacing: 0.03em !important;
    line-height: 1 !important;
    opacity: 1 !important;
    outline: 0px !important;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s !important;
    background-color: rgb(122, 110, 170) !important;
    color: white !important;
}
.nav-item {
    position: relative;
    padding-left: 0px  !important;
    padding-right: 0px !important;
    display: inline-block;

}
.nav-item:hover {
  opacity: 0.65;
}
.nav-item:active{
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
}

.jqeYiC a {
    padding-left: 12px;
    padding-right: 12px;
}

.cEIpjQ {
    background-color: transparent;
    color: rgb(122, 110, 170);
}

.nav-item-link {
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 20px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 40px;
    padding: 0px 16px;
    background-color: rgb(239, 244, 245);
    box-shadow: none;
    color: rgb(31, 199, 212);
}
.nav-item-link-disabled {
    border: 0px;
    border-radius: 16px;
    background-color: rgb(233, 234, 235);
    border-color: rgb(233, 234, 235);
    box-shadow: none;
    color: rgb(189, 194, 196);
    cursor: not-allowed;
}
</style>
