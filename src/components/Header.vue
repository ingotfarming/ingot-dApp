<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky class="bd-navbar py-3">
    <b-container >
      <b-navbar-brand href="#">

        <img :src='require("@/assets/logoGem.svg")' class="" height="45">
        <span class="brand-text">Gem Farming</span>
      </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav >
      <b-navbar-nav>
        <b-nav-item>Home</b-nav-item>
        <b-nav-item to="/App/MyAssets">My Assets</b-nav-item>
        <b-nav-item to="/App/MyFarm">Farming</b-nav-item>
        <b-nav-item to="#">Uniswap LP</b-nav-item>
        <b-nav-item to="/App/Store">Store</b-nav-item>
        <b-nav-item to="/App/PreSale">PreSale</b-nav-item>
        <b-nav-item>Guide</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-button class="connectBtn" v-if="isConnected">{{getSubStringAddress()}}</b-button>
          <b-button class="connectBtn" v-else @click="connectToWallet()">Connect to a wallet</b-button>
      </b-navbar-nav>
    </b-collapse>
    </b-container>
  </b-navbar>

</template>

<script>


export default {
  name: 'Header',
  components: {
  },
  props: {

  },
  data: function() {
    return {
      isConnected:false,
      accountAddress: ""
    }
  },
  created: async function() {
      await this.$contractServicePromise;
      this.isConnected = await this.$contractService.isConnected();
      this.accountAddress = await this.$contractService.getLoggedAccount();
      this.$log.debug(this.accountAddress);
  },
  computed:{ },
  methods: { 
    connectToWallet: async function(){
      let refresh = await this.$contractService.loadWeb3(true, true);
      if (refresh) window.location.reload();
    },
    getSubStringAddress: function(){
      if(this.isConnected && this.accountAddress!=="")
        return this.accountAddress.substring(0,4) + "..." + this.accountAddress.substring(this.accountAddress.length - 4, this.accountAddress.length)
      else return "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bd-navbar {
    box-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 25%), inset 0 -1px 5px rgb(0 0 0 / 25%);
}
.connectBtn{
    border: 1px solid #f05d4d;
    display: inline-block;
    background: none;
    color: #f05d4d !important;
    border-radius: 20px;
    padding: 6px 20px;
    cursor: pointer;
    vertical-align: middle;
}
.connectBtn:hover {
    background: #f05d4d;
    color: #fff !important;
    border: 1px solid #f05d4d;
}
.brand-text{

    margin-left: 10px;
    text-decoration: none;
}

</style>
