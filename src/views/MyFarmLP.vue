<template>
<div>
    <b-jumbotron :header="header" :lead="lead" :fluid="true" class="py-4 jumbotron-style">
        <b-nav align="center " class="mt-4 nav-bar mx-auto" >
    <b-nav-item  class="nav-item nav-item-link" active-class="nav-item-active" link-classes="nav-item-link" to="/Farming">Ingot LP</b-nav-item>
    <b-nav-item  class="nav-item nav-item-link" active-class="nav-item-active" link-classes="nav-item-link" to="/FarmingLP">{{nameExchange}} LP</b-nav-item>
  </b-nav>
      </b-jumbotron>
      <UserInfo  :balanceWidget="true" />
      <div>
</div>

    <b-container class="my-5">
      <b-card no-body class="container-userinfo card-swap mx-auto border-0" >
        <b-card-header class="border-0">
          <div class="sc-jSFjdj sc-gKAaRy sc-hoPuav cYuVaQ kCREZG liDpdV">
              

              <div class="header-image flex-all-center">
                <img width="64" :src='require("@/assets/logoIngot.svg")'>
                <img class="translate2logo" width="64" src="https://pancakeswap.finance/images/tokens/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.svg">
              </div>

              
              <div class="sc-jSFjdj sc-gKAaRy kJmatq hEOriY">
                <h2 color="text" class="sc-gtsrHT sc-iwajpm gSAYor cOHiix">INGOT-BNB</h2>
                <div class="sc-jSFjdj sc-gKAaRy kJmatq cqgffe">
                  <div scale="md" class="sc-jOFryr iNOGX">
                    <svg viewBox="0 0 24 24" width="18px" color="secondary" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM dKlBvL">
                      <path d="M23 12L20.56 9.21L20.9 5.52L17.29 4.7L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 12L3.44 14.79L3.1 18.49L6.71 19.31L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 12ZM9.38 16.01L7 13.61C6.61 13.22 6.61 12.59 7 12.2L7.07 12.13C7.46 11.74 8.1 11.74 8.49 12.13L10.1 13.75L15.25 8.59C15.64 8.2 16.28 8.2 16.67 8.59L16.74 8.66C17.13 9.05 17.13 9.68 16.74 10.07L10.82 16.01C10.41 16.4 9.78 16.4 9.38 16.01Z"></path>
                    </svg>Core
                  </div>
                  <div class="sc-jOFryr jsKeJs sc-leehGg bInvbg" scale="md">1X</div>
                </div>
              </div>
            </div>
          </b-card-header>
        <b-card-body >

          <div class="sc-jSFjdj sc-gKAaRy kJmatq kCREZG">
    <div color="text" class="sc-gtsrHT MlLjM">APR:</div>
    <div color="text" class="sc-gtsrHT jDnmwq" style="display: flex; align-items: center;">
      NA%
    </div>
  </div>
  <div class="sc-jSFjdj sc-gKAaRy kJmatq ViahK">
    <div color="text" class="sc-gtsrHT MlLjM">Earn:</div>
    <div color="text" class="sc-gtsrHT jDnmwq">INGOT + Fees</div>
  </div>
  <div class="sc-gLMgcV EJLaQ">
    <div class="sc-jSFjdj sc-gKAaRy kJmatq jcNvwq">
      <div color="secondary" font-size="12px" class="sc-gtsrHT dKntLt">INGOT</div>
      <div color="textSubtle" font-size="12px" class="sc-gtsrHT bYMJMw">Earned</div>
    </div>
    <div class="sc-jSFjdj sc-gKAaRy dgxfAj kCREZG">
      <div class="sc-jSFjdj sc-gKAaRy kJmatq iSFOyT">
        <h2 color="text" class="sc-gtsrHT sc-iwajpm jDnmwq cOHiix">{{pendingIngot}}</h2>
      </div>
      <button class="sc-hKFxyN eiRTmt" scale="md" @click="deposit('0')">Harvest</button>
    </div>
    <div class="sc-jSFjdj sc-gKAaRy kJmatq jcNvwq">
      <div color="secondary" font-size="12px" class="sc-gtsrHT dKntLt">INGOT-BNB LP</div>
      <div color="textSubtle" font-size="12px" class="sc-gtsrHT bYMJMw">Staked</div>
    </div>
    <div class="sc-jSFjdj sc-gKAaRy kJmatq kCREZG">
      <div class="sc-jSFjdj sc-gKAaRy kJmatq iSFOyT">
        <h2 color="text" class="sc-gtsrHT sc-iwajpm jDnmwq cOHiix">{{stakedLP}}</h2>
      </div>
      <div class="sc-iKUVsf egOQmQ">
        <button class="sc-hKFxyN emqjFq sc-eCApnc fAYopv" scale="md" @click="withdraw()">
          <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM ACFFk">
            <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"></path>
          </svg>
        </button>
        <button class="sc-hKFxyN emqjFq sc-eCApnc fAYopv" scale="md" @click="deposit('1')">
          <svg viewBox="0 0 24 24" color="primary" width="14px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM ACFFk">
            <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"></path>
          </svg>
        </button>
      </div>
    </div>
        <button class="sc-hKFxyN cummnL" width="100%" scale="md" @click="approveAll()">Approve Contract</button>

  </div>
  <div class="sc-kkmGkm cBHyhh"></div>
  <div aria-label="Hide or show expandable content" role="button" class="sc-fJxALz jcbgni">
    <div color="primary" class="sc-gtsrHT iiWEXc">Details</div>
    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-bdnxRM kDWlca">
      <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path>
    </svg>
  </div>


        </b-card-body >
      </b-card>
    </b-container>

</div>
</template>


<script>
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'MyFarm',
  components: {
    UserInfo
  },
  props: {

  },
  data: function() {
    return {
        lead: "Here you can stake and farm Ingot Token",
        header:"Farming LP",
        pid:0,
        pendingIngot:0,
        stakedLP:0
    }
  },
  computed:{
    nameExchange: function () {
        return process.env.VUE_APP_EXCHANGE_NAME;
      },
  },
  created: async function(){
    await this.pendingToken();
    await this.userInfoToFarmLP();
  },
  methods: {
    approveAll: async function() {
      try{
        let result = await this.$contractService.approveMaxToFarmLP();
        this.$log.debug(result)
        if(result){
          this.$Swal.fire('Good job!','Transaction success','success');
        }else{
        this.$Swal.fire('Oops','Something went wrong!','error');
        }
      }catch(message){
        this.$log.error(message);
        this.$Swal.fire('Oops','Something went wrong!','error');
      }
    },

    deposit: async function(amount) {
      try{
        let result = await this.$contractService.depositToFarmLP(this.pid,amount);
        this.$log.debug(result)
        if(result){
          this.$Swal.fire('Good job!','Transaction success','success');
        }else{
        this.$Swal.fire('Oops','Something went wrong!','error');
        }
      }catch(message){
        this.$log.error(message);
        this.$Swal.fire('Oops','Something went wrong!','error');
      }
    },
    withdraw: async function() {
      try{
        let result = await this.$contractService.withdrawToFarmLP(this.pid,'0.5');
        this.$log.debug(result)
        if(result){
          this.$Swal.fire('Good job!','Transaction success','success');
        }else{
        this.$Swal.fire('Oops','Something went wrong!','error');
        }
      }catch(message){
        this.$log.error(message);
        this.$Swal.fire('Oops','Something went wrong!','error');
      }
    },
    pendingToken: async function() {
        let result = await this.$contractService.pendingToFarmLP(this.pid);
        this.$log.debug(result);
        this.pendingIngot = result;
    },
      userInfoToFarmLP: async function() {
        let result = await this.$contractService.userInfoToFarmLP(this.pid);
        this.$log.debug(result);
        this.stakedLP = result;
    }




    
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
.translate2logo{
      transform: translateX(-10px);

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

/*CARD */
.card-header {
background: linear-gradient(
111.68deg
, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
    border-radius: 31px 31px 0px 0px;
    padding: 24px;
}

.card-swap{
    position: relative;
    max-width: 400px;
    width: 100%;
}
.klJKGu {
    align-self: baseline;
    background: rgb(255, 255, 255);
    border-radius: 24px;
    box-shadow: rgb(25 19 38 / 15%) 0px 1px 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 24px;
    position: relative;
    text-align: center;
    max-width: 480px;

}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.hyACbC > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0px 8px 32px;
}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.kMrdas {
    max-height: 64px;
    max-width: 64px;
    position: relative;
    width: 100%;
}
.cBmbuT {
    position: absolute;
    width: 82%;
    inset: auto 0px 0px auto;
    z-index: 6;
}
.kMrdas {
    max-height: 64px;
    max-width: 64px;
    position: relative;
    width: 100%;
}
.bojiJp {
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}
.cqgffe {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
}
.cOHiix {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
}

.gSAYor {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 4px;
}

.kxcFcV {
    position: absolute;
    width: 50%;
    inset: 0px auto auto 0px;
    z-index: 5;
}
.cjBCHU {
    max-height: 32px;
    max-width: 32px;
    position: relative;
    width: 100%;
}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.jcNvwq {
    display: flex;
}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}

.dgxfAj {
    margin-bottom: 8px;
}
.jcNvwq {
    display: flex;
}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.cBHyhh {
    background-color: rgb(231, 227, 235);
    height: 1px;
    margin: 28px auto;
    width: 100%;
}
.jcbgni {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
}
.iiNPWl {
    height: 0px;
    overflow: hidden;
}
.iiWEXc {
    color: rgb(31, 199, 212);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
}
.jcbgni svg {
    fill: rgb(31, 199, 212);
}
.iSFOyT {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.cOHiix {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.1;
}
.jDnmwq {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
}
.kkOvLJ {
    color: rgb(122, 110, 170);
    font-weight: 400;
    line-height: 1.5;
    font-size: 12px;
}
.fAYopv {
    padding: 0px;
    width: 48px;
}
.cummnL {
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
    margin-top: 8px;
}
.egOQmQ svg {
    width: 20px;
}

.ACFFk {
    align-self: center;
    fill: rgb(31, 199, 212);
    flex-shrink: 0;
}
.emqjFq {
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
    height: 48px;
    padding: 0px 24px;
    background-color: rgb(239, 244, 245);
    box-shadow: none;
    color: rgb(31, 199, 212);
    margin-right: 6px;
}
.dKntLt {
    color: rgb(118, 69, 217);
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
    padding-right: 4px;
    font-size: 12px;
}
.bYMJMw {
    color: rgb(122, 110, 170);
    font-weight: 600;
    line-height: 1.5;
    text-transform: uppercase;
    font-size: 12px;
}
.eiRTmt {
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
}
.jDnmwq {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
}
.MlLjM {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}
.cBmbuT {
    position: absolute;
    width: 82%;
    inset: auto 0px 0px auto;
    z-index: 6;
}
.kMrdas {
    max-height: 64px;
    max-width: 64px;
    position: relative;
    width: 100%;
}
.kxcFcV {
    position: absolute;
    width: 50%;
    inset: 0px auto auto 0px;
    z-index: 5;
}

.cjBCHU {
    max-height: 32px;
    max-width: 32px;
    position: relative;
    width: 100%;
}
.bojiJp {
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}
.bojiJp {
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}
.bInvbg {
    margin-left: 4px;
}

.jsKeJs {
    -webkit-box-align: center;
    align-items: center;
    border-radius: 16px;
    color: rgb(255, 255, 255);
    display: inline-flex;
    font-weight: 400;
    white-space: nowrap;
    height: 28px;
    padding: 0px 8px;
    font-size: 14px;
    background-color: rgb(118, 69, 217);
}
.iNOGX {
    -webkit-box-align: center;
    align-items: center;
    border-radius: 16px;
    display: inline-flex;
    font-weight: 400;
    white-space: nowrap;
    height: 28px;
    padding: 0px 8px;
    font-size: 14px;
    color: rgb(118, 69, 217);
    background: transparent;
    border: 2px solid rgb(118, 69, 217);
}
.jDnmwq {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
}
.fAYovO {
    padding: 0px;
    width: 32px;
}
.hmVgeU {
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
    margin-left: 4px;
}
.kDWlca {
    align-self: center;
    fill: rgb(40, 13, 95);
    flex-shrink: 0;
}
.MlLjM {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}
.kCREZG {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
}
.ViahK {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
}
.jDnmwq {
    color: rgb(40, 13, 95);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
}
.bojiJp {
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}
.cBmbuT {
    position: absolute;
    width: 82%;
    inset: auto 0px 0px auto;
    z-index: 6;
}

.kMrdas {
    max-height: 64px;
    max-width: 64px;
    position: relative;
    width: 100%;
}

</style>
