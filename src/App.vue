<template>
  <div id="App" class="bg-gradient">
    <Header/>
      <router-view/>
    <Footer/>
  </div>
</template>
<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
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
.bg-gradient {
    /* background: radial-gradient(50% 50% at 50% 50%, rgb(240 242 255) 0%, rgb(255, 255, 255) 100%);*/
    background-color: rgb(255, 255, 255)
}

/* CARD NFT START */
.container-asset {
    box-shadow: 0 8px 28px -6px rgb(62 25 18 / 10%), 0 16px 60px -12px rgb(62 25 18 / 8%);
    border-radius: 36px;
    background: rgb(255, 255, 255);
    padding: 0 0 0 0;
}
.card-header-asset {
background: linear-gradient(
111.68deg
, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%);
    border-radius: 31px 31px 0px 0px !important;
    padding: 24px;
    border-bottom: none
}
.card-body-asset{
  margin: 24px 48px 24px 48px;
}
/* CARD NFT END */

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
.jumbotron-style {
    background: linear-gradient(139.73deg, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
}
div.jumbotron > div.container > h1 {
      color: rgb(118, 69, 217);
      font-weight: 400;
}
</style>

