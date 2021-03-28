<template>
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
</template>

<script>

import ContractsServices from '../services/ContractsServices.js'
const contractsServices = new ContractsServices();

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
        powerInPool:0
    }
  },
  computed:{},
  created: async function(){
      this.nToken = Number((await contractsServices.getBalanceOfFamToken())).toFixed(3);
      this.pendingReward = Number((await contractsServices.getStimateRewardPool())).toFixed(3);
      this.powerInPool= await (contractsServices.getPowerInPool());
  },
  methods: {
      claim: async function(){
        contractsServices.claimFromPool();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
