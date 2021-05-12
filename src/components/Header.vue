<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky class="bd-navbar py-3">
    <b-container fluid>
    <b-navbar-brand href="#">FAM Asset</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav >
      <b-navbar-nav>
        <b-nav-item>Home</b-nav-item>
        <b-nav-item to="/App/MyAssets">My Assets</b-nav-item>
        <b-nav-item to="/App/MyFarm">My Farm</b-nav-item>
        <b-nav-item to="/App/Store">Store</b-nav-item>
        <b-nav-item to="/App/PreSale">PreSale</b-nav-item>
        <b-nav-item>Guide</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-button class="my-2 my-sm-0" pill variant="success" v-if="isConnected" @click="connectToWallet()">Connected</b-button>
          <b-button class="my-2 my-sm-0" pill variant="success" v-else>Connect Wallet</b-button>
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
      isConnected:false
    }
  },
  created: async function() {
      this.isConnected = await this.$contractService.isConnected();
  },
  computed:{ },
  methods: { 
    connectToWallet: async function(){
      await this.$contractService.connectAccount();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bd-navbar {
    box-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 25%), inset 0 -1px 5px rgb(0 0 0 / 25%);
}
</style>
