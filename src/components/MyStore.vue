<template>
<div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4" :key="asset.id" v-for="asset in assets">
                <Asset :id="asset.id" :numberAsset="asset.number" />
            </div>    
          </div>
        </div>
  </div>

</template>
<script>
import Asset from './Asset.vue'

//import ContractsServices from '../services/ContractsServices.js'
//const contractsServices = new ContractsServices();

export default {
  name: 'MyStore',
  components: {
    Asset,
  },
  props: {

  },
  data: function() {
    return {
              casing: {
          type:"MY_ASSETS",
          buttonChoose:false},
        assets : [{id:0},{id:1},{id:2},{id:3}]
    }
  },
  computed:{},
  created: async function(){
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
