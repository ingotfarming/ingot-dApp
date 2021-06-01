<template>
<div>
  <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4 jumbotron-style"></b-jumbotron>   
      <UserInfo  :balanceWidget="true" />

    <b-container class="my-5">
      <b-card no-body class="container-userinfo card-swap mx-auto border-0" >
        <b-card-header class="border-0">
          <div class="sc-jSFjdj sc-gKAaRy kJmatq eqGhLO"><div class="sc-jSFjdj sc-gKAaRy kJmatq iIdAKa"><h2 color="body" scale="lg" class="sc-gtsrHT sc-bCwfaz krsPTE KsMbG">Buy Token</h2><div color="textSubtle" class="sc-gtsrHT grfoLI">Buy Token from ETH</div></div><div height="64" class="sc-iwajpm icJUJX"><img :src='require("@/assets/logoIngot.svg")' alt="INGOT" class="sc-cxNHIi fHUQtx" height="64"></div></div>
        </b-card-header>
        <b-card-body >
          
      
          <b-form-group label-for="EthInput" class="text-center " label-size="lg">
              <h5 class="grfoLI">PreSale <span v-if="saleIsOpen">Open</span><span v-else>Closed</span></h5>
          </b-form-group>


<div class="sc-dWdcrH fvBiDf">
   <div id="swap-currency-input" class="sc-cjHJEj fZxzxc">
      <div class="sc-ihnbgO dtTmUC">
         <div class="sc-fxNNfJ htcbg">
            <div class="sc-jGVbCA sc-fXoxut sc-Fyfyc cBDHvY fnVNkv fTMjUf">
               <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo">From</div>
            </div>
         </div>
         <div class="sc-gYhigD hMrKZs">
            <b-form-input class="sc-ksXhwv jSLqHT token-amount-input" min="0" v-model="ETHforBuy" id="EthInput" type="number" @input="convEthToToken(ETHforBuy)"></b-form-input> 
            <!-- input class="sc-ksXhwv jSLqHT token-amount-input" inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minlength="1" maxlength="79" spellcheck="false" value="1" -->
            <button class="sc-bGqQkm ebCXba open-currency-select-button">
               <span class="sc-fXvjs endHJt">
                  <img class="sc-bUrJUP fvDLME" width=24px alt="ETH" src="https://exchange.pancakeswap.finance/images/coins/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png" style="margin-right: 8px;">
                  <div id="pair" color="text" class="sc-gsTCUz hJWxft">ETH</div>
               </span>
            </button>
         </div>
      </div>
   </div>

   <div class="sc-dWdcrH kiaxcP">
      <div class="sc-jGVbCA sc-fXoxut sc-eFubAy cBDHvY fnVNkv knMnao" style="padding: 0px 1rem;">
         <div class="sc-ehsPrw gkONdE">
            <button class="sc-dlfnbm kjqmyj sc-hKgILt fwjcqd" scale="sm" style="border-radius: 50%;">
               <svg viewBox="0 0 24 24" color="primary" width="24px" xmlns="http://www.w3.org/2000/svg" class="sc-bdfBwQ fxYfwL">
                  <path d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div>
   
   <div id="swap-currency-output" class="sc-cjHJEj fZxzxc">
      <div class="sc-ihnbgO dtTmUC">
         <div class="sc-fxNNfJ htcbg">
            <div class="sc-jGVbCA sc-fXoxut sc-Fyfyc cBDHvY fnVNkv fTMjUf">
               <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo">To (estimated)</div>
            </div>
         </div>
         <div class="sc-gYhigD hMrKZs">
            <input class="sc-ksXhwv jSLqHT token-amount-input" readonly inputmode="decimal" title="Token Amount" autocomplete="off" autocorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minlength="1" maxlength="79" spellcheck="false" :value=tokens>
            <button class="sc-bGqQkm ebCXba open-currency-select-button">
               <span class="sc-fXvjs endHJt">
                  <img class="sc-bUrJUP fvDLME" width=24px alt="INGOT" :src='require("@/assets/logoIngot.svg")' style="margin-right: 8px;">
                  <div id="pair" color="text" class="sc-gsTCUz hJWxft">INGOT</div>
               </span>
            </button>
         </div>
      </div>
   </div>
   <div class="sc-irlOZD fvZHbs">
      <div class="sc-dWdcrH Armuo">
         <div class="sc-jGVbCA sc-fXoxut sc-Fyfyc cBDHvY fnVNkv fTMjUf">
            <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo">Price: </div>
            <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo" style="justify-content: center; align-items: center; display: flex;">
               {{conversion}} INGOT per 1 ETH
            </div>
         </div>
      </div>
   </div>
    <div class="sc-irlOZD fvZHbs">
      <div class="sc-dWdcrH Armuo">
         <div class="sc-jGVbCA sc-fXoxut sc-Fyfyc cBDHvY fnVNkv fTMjUf">
            <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo">ETH Aviable: </div>
            <div font-size="14px" color="text" class="sc-gsTCUz iZoLXo" style="justify-content: center; align-items: center; display: flex;">
               {{fromWei(weiAviable)}} ETH
            </div>
         </div>
      </div>
   </div>
</div>
<div class="sc-iuAqxS kanDXL"><button @click="buyTokens(ETHforBuy)" :disabled="buttonBuyDisabled" class="hWXYpz" width="100%" scale="md">Buy</button ></div>

        </b-card-body>
      </b-card>
    </b-container>

</div>
</template>

<script>
import web3 from 'web3';
import { BN } from "web3-utils";

import UserInfo from '@/components/UserInfo.vue'
import EventBus from '@/main.js'

export default {
  name: 'Store',
  components: {
      UserInfo
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can buy the Ingot Token at Pre Sale stage",
        header:"Pre Sale",
        ETHforBuy : 0,
        tokens : 0,
        conversion: 0,
        weiAviable: new BN(0),
        saleIsOpen : false,
        buttonBuyDisabled: true
    }
  },
  computed:{},
  created: async function(){
    await this.$contractServicePromise;
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
        this.$Swal.fire('Good job!','Transaction success','success');
        this.ETHforBuy = '0';
        this.convEthToToken(this.ETHforBuy)
        EventBus.$emit('bus-tokens-changed');
      }else{
      this.$Swal.fire('Oops','Something went wrong!','error');
      }
    }catch(message){
      this.$log.error(message);
      this.$Swal.fire('Oops','Something went wrong!','error');
    }
   
  },
  convEthToToken: function(amounts){
      try{
        var weiAmount = new BN(web3.utils.toWei(String(amounts)));
        this.tokens = web3.utils.fromWei(weiAmount.mul(new BN(this.conversion)));
        this.$log.debug(amounts, this.tokens)
        if(weiAmount.lte(this.weiAviable) && weiAmount.gt(new BN(0)) && this.saleIsOpen){
            this.$log.debug("amounts <=aviable");
            this.buttonBuyDisabled = false;
        }else{
            this.$log.debug("amounts > aviable");
            this.buttonBuyDisabled = true;
        }
      }catch(e){
        this.$log.debug(e);
        this.buttonBuyDisabled = true;
      }
        
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

/* Start Header */
.card-header {
background: linear-gradient(
111.68deg
, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
    border-radius: 31px 31px 0px 0px;
    padding: 24px;
}

.eqGhLO {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(118, 69, 217);
}

.KsMbG {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.1;
}
.grfoLI {
    color: rgb(122, 110, 170);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}

.fZxzxc {
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 20px;
    background-color: rgb(250, 249, 250);
    z-index: 1;
}
.dtTmUC {
    border-radius: 16px;
    background-color: rgb(238, 234, 244);
    box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px inset;
}
.htcbg {
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(69, 42, 122);
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.75rem 1rem 0px;
}
.fTMjUf {
    -webkit-box-pack: justify;
    justify-content: space-between;
}
/* end Header */

.fvBiDf {
    display: grid;
    grid-auto-rows: auto;
    row-gap: 12px;
}
.fnVNkv {
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
}
.kjqmyj {
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 32px;
    width: 32px;
    background-color: rgb(239, 244, 245);
    box-shadow: none;
    color: rgb(31, 199, 212);
}
.cBDHvY {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}
.fxYfwL {
    align-self: center;
    fill: rgb(31, 199, 212);
    flex-shrink: 0;
}
.iZoLXo {
    color: rgb(69, 42, 122);
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
}
.hMrKZs {
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    padding: 0.75rem 0.75rem 0.75rem 1rem;
}
.jSLqHT {
    color: rgb(69, 42, 122);
    width: 0px;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
}
.iEiNCU {
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 32px;
    padding: 0px 16px;
    background-color: transparent;
    color: rgb(31, 199, 212);
    box-shadow: none;
}
.ebCXba {
    -webkit-box-align: center;
    align-items: center;
    height: 34px;
    font-size: 16px;
    font-weight: 500;
    background-color: transparent;
    color: rgb(69, 42, 122);
    border-radius: 12px;
    outline: none;
    cursor: pointer;
    user-select: none;
    border: none;
    padding: 0px 0.5rem;
}
.endHJt {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.kiaxcP {
    display: grid;
    grid-auto-rows: auto;
}
.knMnao {
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;
}

.fnVNkv {
    width: 100%;
    display: flex;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
}
.cBDHvY {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
}

.fvZHbs {
    width: 100%;
    padding: 0.25rem 0.75rem 0px;
    border-radius: 20px;
}
.kanDXL {
    margin-top: 1rem;
}
.hWXYpz {
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    height: 48px;
    padding: 0px 24px;
    background-color: rgb(31, 199, 212);
    color: white;
    width: 100%;
}
.hWXYpz:hover:enabled {
    opacity: 0.65;
}
.hWXYpz:disabled {
    background-color: rgb(233, 234, 235);
    border-color: rgb(233, 234, 235);
    box-shadow: none;
    color: rgb(189, 194, 196);
    cursor: not-allowed;
}
.gkONdE {
    padding: 2px;
}

.hWXYpz:active{
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
    background-color: rgb(31, 199, 212) !important;

}
</style>
