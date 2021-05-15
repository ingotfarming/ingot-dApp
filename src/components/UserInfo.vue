<template>

<b-container class= "">
  <div>
    <b-card-group deck>
      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
          <b-card-text>
            <b-row align-v="center">
              <b-col><h4>Balance:</h4></b-col>
              <b-col><h5>{{nToken}}</h5></b-col>
            </b-row>
            <b-row align-v="center">
              <b-col><h4>ETH:</h4></b-col>
              <b-col><h5>{{balanceETH}}</h5></b-col>
            </b-row>
          </b-card-text>
      </b-card>

      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
        <b-card-text>
          <b-row align-v="center">
            <b-col><h4>Your Power:</h4></b-col>
            <b-col><h5>{{powerInPool}}</h5></b-col>
          </b-row>
          <b-row align-v="center">
            <b-col><h4>Power Pool:</h4></b-col>
            <b-col><h5>{{powerTotal}}</h5></b-col>
          </b-row>
          
      </b-card-text>
      </b-card>

      <b-card bg-variant="white" text-variant="black" align="center" class="container-userinfo border-0">
        <b-card-text>
          <b-row align-v="center">
            <b-col><h4>Pending Reward:</h4></b-col>
            <b-col><h5>{{pendingReward}}</h5><button type="button" class="btn btn-sm btn-block btn-warning badge-pill" @click="claim">Claim</button></b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
  </b-container>

<!--<b-col><div class="icon icon-shape text-white rounded-circle shadow bg-green"><font-awesome-icon icon="coins" size="lg" /> </div></b-col><-->
<!--
    <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-3 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">User Info</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">Token Balance: {{nToken}} <small class="text-muted"></small></h4>
              <h4 class="card-title pricing-card-title">Power In Pool: {{powerInPool}} <small class="text-muted"></small></h4>
          </div>
        </div>
        <div class="card mb-3 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Pending Reward</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title pricing-card-title">{{pendingReward}}<small class="text-muted"></small></h4>
            <button type="button" class="btn btn-lg btn-block btn-warning" @click="claim" >Claim</button>
          </div>
        </div>
      </div>
    </div>
    -->
</template>

<script>


export default {
  name: 'UserInfo',
  components: {
  },
  props: {
    msg: String
  },
  data: function() {
    return {
        nToken: 0,
        pendingReward: 0,
        powerInPool:0,
        balanceETH : 0,
        powerTotal:0
    }
  },
  computed:{},
  created: async function(){
      this.nToken = Number((await this.$contractService.getBalanceOfFamToken())).toFixed(3);
      this.pendingReward = Number((await this.$contractService.getPendingReward())).toFixed(3);
      this.powerInPool= await (this.$contractService.getUserInfo());
      this.powerTotal = await(this.$contractService.getPoolShare());
      this.balanceETH = await this.$contractService.getBalanceETH()

  },
  methods: {
      claim: async function(){
        try{
          let result = await this.$contractService.claimFromPool();
          this.$log.debug("claim", result)
          if(result){
            this.$Swal.fire('Good job!','You clicked the button!','success');
          }else{
          this.$Swal.fire('Oops','Something went wrong!','error');
          }
        }catch(message){
          this.$log.error(message);
          this.$Swal.fire('Oops','Something went wrong!','error');
        }finally{
            this.nToken = Number((await this.$contractService.getBalanceOfFamToken())).toFixed(3);
            this.pendingReward = Number((await this.$contractService.getPendingReward())).toFixed(3);
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
