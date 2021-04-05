<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  async created(){
    await this.$contractService.init();
  }
}
</script>

<style>
</style>
