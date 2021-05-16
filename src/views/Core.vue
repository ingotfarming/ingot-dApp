<template>
  <div class="bg-light">
    <Header/>
      <router-view/>
    <Footer/>
  </div>
</template>
<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
//import Sidebar from '@/components/Sidebar'

export default {
  name: 'Core',
  components: {
    Header,
    Footer
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.bg-light {
    background-color: #f8f9fa!important;
}
.container-asset {
    box-shadow: 0 8px 28px -6px rgb(62 25 18 / 10%), 0 16px 60px -12px rgb(62 25 18 / 8%);
    border-radius: 36px;
    background: rgb(255, 255, 255);
    padding: 0 31px 60px 41px;
}
.container-userinfo {
    box-shadow: 0 8px 28px -6px rgb(62 25 18 / 10%), 0 16px 60px -12px rgb(62 25 18 / 8%);
    border-radius: 36px;
    background: rgb(255, 255, 255);
}
.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 5%);
}
.rounded {
    border-radius: .25rem!important;
}
</style>

