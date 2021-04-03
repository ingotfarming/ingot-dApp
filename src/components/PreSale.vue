<template>
<div>
  <b-jumbotron :header="header" :lead="lead" fluid=false class="py-4"></b-jumbotron>   
  <b-container class="my-5">
    <b-card bg-variant="light">
      <b-row>
        <b-col md="3"/>
        <b-col md="6">
              <b-form-group label="Buy Token from ETH" label-for="EthInput" class="text-center" label-size="lg">
                <b-input-group>
                <b-form-input min="0" v-model="ETHforBuy" id="EthInput" type="number" @input="convEthToToken(ETHforBuy)"></b-form-input>
                
                <b-input-group-append is-text><b>Eth</b></b-input-group-append>
                <b-input-group-prepend is-text><b>-></b></b-input-group-prepend>
                
                <b-form-input  disabled v-model="tokens" id="TokensInput" type="number"></b-form-input>
                <b-input-group-append is-text><b>Tokens</b></b-input-group-append>
                </b-input-group>
              </b-form-group>
          <b-button block variant="success" @click="buyTokens(ETHforBuy)">Buy</b-button>
          </b-col>
          <b-col md="3"/>
        </b-row>
    </b-card>
  </b-container>


</div>
</template>

<script>

export default {
  name: 'Store',
  components: {
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can buy the tokens in pre sale",
        header:"Pre Sale",
        ETHforBuy : 0,
        tokens : 0,
        conversion: 0,
        
    }
  },
  computed:{},
  created: async function(){
    this.conversion = await this.$contractService.getFactorWeiToken();
  },
  methods: {
  buyTokens: function(amounts){
    this.$log.debug(amounts)
    this.$contractService.buyTokens(amounts);
  },
  convEthToToken: function(amounts){
   this.tokens = amounts * this.conversion;
    this.$log.debug(amounts, this.tokens)
  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
