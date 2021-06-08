<template>

<b-container class= "">
  <div>
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="4" v-if="balanceWidget">
      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
          <b-card-text>
            <b-row align-v="center">
              <b-col><h5>Balance:</h5></b-col>
              <b-col class="d-flex justify-content-center "><h5 class="align-self-center mb-0">{{nToken}}</h5><img :src='require("@/assets/logoIngot.svg")' class="pl-1" height="30" alt="INGOT"></b-col>
            </b-row>
            <b-row align-v="center">
              <b-col><h5>Buy INGOT:</h5></b-col>
              <b-col><a target="_blank" rel="noopener noreferrer" href="https://app.uniswap.org/#/swap" class="btn btn-sm btn-block  badge-pill button-uniswap" role="button">Uniswap</a></b-col>
            
            </b-row>
          </b-card-text>
            
      </b-card>
</b-col>

        <b-col md="4" v-if="poolPowerWidget">
      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
        <b-card-text>
          <b-row align-v="center">
            <b-col md="8"><h5>Your Value:</h5></b-col>
            <b-col><h5>{{powerInPool}}</h5></b-col>
          </b-row>
          <b-row align-v="center">
            <b-col md="8"><h5>Value Pool:</h5></b-col>
            <b-col><h5>{{powerTotal}}</h5></b-col>
          </b-row>
          <b-row align-v="center">
            <b-col md="8"><h5>Reward for Block:</h5></b-col>
            <b-col class="d-flex justify-content-center"><h5 class="align-self-center mb-0">{{rewardForBlockFarm}}</h5><img :src='require("@/assets/logoIngot.svg")' class="pl-1" height="30" alt="INGOT"></b-col>
          </b-row>
          
      </b-card-text>
      </b-card>
    </b-col>
     
     <b-col md="4" v-if="rewardWidget">
      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
        <b-card-text>
          <b-row align-v="center">
            <b-col><h5>Pending Reward:</h5></b-col>
            <b-col class="d-flex justify-content-center"><h5 class="align-self-center mb-0">{{pendingReward}}</h5><img :src='require("@/assets/logoIngot.svg")' class="pl-1" height="30" alt="INGOT"></b-col>
          </b-row>
          <b-row> 
            <b-col><button type="button" class="btn btn-sm btn-block btn-warning badge-pill button-claim" @click="claim">Claim</button></b-col>
          </b-row>
        </b-card-text>
      </b-card>
      </b-col>
      


      </b-row>
  </div>
  </b-container>
</template>

<script>
import EventBus from '@/main.js'
import web3 from 'web3';

export default {
  name: 'UserInfo',
  components: {
  },
  props: {
    balanceWidget : { type: Boolean, default: false },
    poolPowerWidget : { type: Boolean, default: false },
    rewardWidget : { type: Boolean, default: false },
    uniswapSwapWidget : { type: Boolean, default: true },


  },
  data: function() {
    return {
        nToken: 0,
        pendingReward: 0,
        powerInPool:0,
        balanceETH : 0,
        powerTotal:0,
        rewardForBlockFarm:0
    }
  },
  computed:{},
  created: async function(){
      await this.$contractServicePromise;
      this.nToken = Number((await this.$contractService.getBalanceOfIngotToken())).toFixed(3);
      this.pendingReward = Number((await this.$contractService.getPendingReward())).toFixed(3); //check when is 0
      this.powerInPool= await (this.$contractService.getUserInfo());
      this.powerTotal = await(this.$contractService.getPoolShare());
      this.rewardForBlockFarm = web3.utils.fromWei(await(this.$contractService.getRewardForBlockFarm()));

      //this.balanceETH = await this.$contractService.getBalanceETH();

      EventBus.$on('bus-tokens-changed', async () => {
        this.nToken = Number((await this.$contractService.getBalanceOfIngotToken())).toFixed(3);
      });
      EventBus.$on('bus-powers-changed', async () => {
        this.powerInPool= await (this.$contractService.getUserInfo());
        this.powerTotal = await(this.$contractService.getPoolShare());
      });


  },
  methods: {
      claim: async function(){
        try{
          let result = await this.$contractService.claimFromPool();
          this.$log.debug("claim", result);
          if(result){
            this.$Swal.fire('Good job!','Transaction success','success');
            EventBus.$emit('bus-tokens-changed');
          }else{
          this.$Swal.fire('Oops','Something went wrong!','error');
          }
        }catch(message){
          this.$log.error(message);
          this.$Swal.fire('Oops','Something went wrong!','error');
        }finally{
            this.nToken = Number((await this.$contractService.getBalanceOfIngotToken())).toFixed(3);
            this.pendingReward = Number((await this.$contractService.getPendingReward())).toFixed(3);
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4{
  margin-bottom: 0px;
}
.button-uniswap{
    background: linear-gradient(128.17deg, #BD00FF -14.78%, #FF1F8A 110.05%);
    color: white;
    padding: 0.25rem 0.75rem;
    background-color: rgb(1, 1, 1);
    text-decoration: none;
    color: rgb(255, 255, 255);
    display: inline-block;
    font-weight: 600;
    transition: transform 0.45s cubic-bezier(0.19, 1, 0.22, 1) 0s;
}
.button-uniswap:hover {
    background: #BD00FF;
}
.button-uniswap:active, .button-claim:active{
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
}
.container-userinfo {
    box-shadow: 0 8px 28px -6px rgb(62 25 18 / 10%), 0 16px 60px -12px rgb(62 25 18 / 8%);
    border-radius: 36px;
    background: rgb(255, 255, 255);
}
</style>
