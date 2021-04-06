<template>

<b-container class= "my-5">
  <div>
    <b-card-group deck>
      <b-card bg-variant="light" text-variant="black" align="center">
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

      <b-card bg-variant="light" text-variant="black" align="center">
        <b-card-text>
          <b-row align-v="center">
            <b-col><h4>Power Pool:</h4></b-col>
            <b-col><h5>{{powerInPool}}</h5></b-col>
          </b-row>
      </b-card-text>
      </b-card>

      <b-card bg-variant="light" text-variant="black" align="center">
        <b-card-text>
          <b-row align-v="center">
            <b-col><h4>Pending Reward:</h4></b-col>
            <b-col><h5>{{pendingReward}}</h5><button type="button" class="btn btn-sm btn-block btn-warning" @click="claim">Claim</button></b-col>
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
        balanceETH : 0
    }
  },
  computed:{},
  created: async function(){
      this.nToken = Number((await this.$contractService.getBalanceOfFamToken())).toFixed(3);
      this.pendingReward = Number((await this.$contractService.getStimateRewardPool())).toFixed(3);
      this.powerInPool= await (this.$contractService.getUserInfo());
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
            this.pendingReward = Number((await this.$contractService.getStimateRewardPool())).toFixed(3);
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-green {
    background-color: #2dce89!important
}
.rounded-circle {
    border-radius: 50%!important
}

.icon {
    width: 3rem;
    height: 3rem
}

.icon i,.icon svg {
    font-size: 2.25rem
}

.icon+.icon-text {
    padding-left: 1rem;
    width: calc(100% - 3rem - 1)
}

.icon-xl {
    width: 5rem;
    height: 5rem
}

.icon-xl i,.icon-xl svg {
    font-size: 4.25rem
}

.icon-xl+.icon-text {
    width: calc(100% - 5rem - 1)
}

.icon-lg {
    width: 4rem;
    height: 4rem
}

.icon-lg i,.icon-lg svg {
    font-size: 3.25rem
}

.icon-lg+.icon-text {
    width: calc(100% - 4rem - 1)
}

.icon-sm {
    width: 2rem;
    height: 2rem
}

.icon-sm i,.icon-sm svg {
    font-size: 1.25rem
}

.icon-sm+.icon-text {
    width: calc(100% - 2rem - 1)
}

.icon-shape {
    padding: 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%
}

.icon-shape i,.icon-shape svg {
    font-size: 1.25rem
}

.icon-shape.icon-lg i,.icon-shape.icon-lg svg {
    font-size: 1.625rem
}

.icon-shape.icon-sm i,.icon-shape.icon-sm svg {
    font-size: .875rem
}

.icon-shape svg {
    width: 30px;
    height: 30px
}

.icon-shape-primary {
    color: #2643e9;
    background-color: rgba(138,152,235,.5)
}

.icon-shape-secondary {
    color: #cfe3f1;
    background-color: hsla(0,0%,100%,.5)
}

.icon-shape-success {
    color: #1aae6f;
    background-color: rgba(84,218,161,.5)
}

.icon-shape-info {
    color: #03acca;
    background-color: rgba(65,215,242,.5)
}

.icon-shape-warning {
    color: #ff3709;
    background-color: rgba(252,140,114,.5)
}

.icon-shape-danger {
    color: #f80031;
    background-color: rgba(247,103,131,.5)
}

.icon-shape-light {
    color: #879cb0;
    background-color: rgba(201,207,212,.5)
}

.icon-shape-dark {
    color: #090c0e;
    background-color: rgba(56,63,69,.5)
}

.icon-shape-default {
    color: #091428;
    background-color: rgba(35,65,116,.5)
}

.icon-shape-neutral,.icon-shape-white {
    color: #e8e3e3;
    background-color: hsla(0,0%,100%,.5)
}

.icon-shape-darker {
    color: #000;
    background-color: rgba(26,26,26,.5)
}
</style>
