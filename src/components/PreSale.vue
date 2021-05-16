<template>
<div>
  <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4"></b-jumbotron>   

    <b-container class="my-5">
      <b-card no-body class="container-userinfo card-swap mx-auto">
        <b-card-body class="text-center">
          <b-form-group label="Buy Token from ETH" label-for="EthInput" class="text-center " label-size="lg">
              <h5 >Store: <p v-if="saleIsOpen">Open</p><p v-else>Closed</p></h5>
              <h5 >1 Eth: {{conversion}} Tok</h5>
              <h5 >Eth aviable: {{fromWei(weiAviable)}} </h5>
            <b-input-group class="w-75 mx-auto">
              <b-form-input min="0" v-model="ETHforBuy" id="EthInput" type="number" @input="convEthToToken(ETHforBuy)"></b-form-input> 
              <b-input-group-append is-text><b>Eth</b></b-input-group-append>
              <b-input-group-prepend is-text><b>-></b></b-input-group-prepend>         
              <b-form-input  disabled v-model="tokens" id="TokensInput" type="number"></b-form-input>
              <b-input-group-append is-text><b>Tokens</b></b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-button block variant="success" @click="buyTokens(ETHforBuy)" class="w-50 mx-auto">Buy</b-button>
        </b-card-body>
      </b-card>
    </b-container>

</div>
</template>

<script>
import web3 from 'web3';
import { BN } from "web3-utils";


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
        weiAviable: new BN(0),
        saleIsOpen : false    
    }
  },
  computed:{},
  created: async function(){
    this.saleIsOpen = await this.$contractService.getisPresale();
    this.conversion = await this.$contractService.getFactorWeiToken();
    this.weiAviable = (new BN(await this.$contractService.getEthCap())).sub( new BN(await this.$contractService.getweiRaised()));

  },
  methods: {
  buyTokens: async function(amounts){
      try{
      let result = await this.$contractService.buyTokens(amounts);
      this.$log.debug(result)
      if(result){
        this.$Swal.fire('Good job!','You clicked the button!','success');
      }else{
      this.$Swal.fire('Oops','Something went wrong!','error');
      }
    }catch(message){
      this.$log.error(message);
      this.$Swal.fire('Oops','Something went wrong!','error');
    }
   
  },
  convEthToToken: function(amounts){
   this.tokens = amounts * this.conversion;
    this.$log.debug(amounts, this.tokens)
  },
  fromWei: function(wei){
    return  web3.utils.fromWei(wei).toString();

  }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card-swap{
    position: relative;
    max-width: 480px;
    width: 100%;
}

.hDYifv {
    position: relative;
    max-width: 480px;
    width: 100%;
    background: rgb(25, 27, 31);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
    border-radius: 24px;
    margin-top: 1rem;
}
</style>
