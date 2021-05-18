<template>
  <div class="bg-gradient">
    <Header/>
   <!-- <div class="kjKrUi"/> -->
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
.bg-gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(240 242 255) 0%, rgb(255, 255, 255) 100%);
}
.kjKrUi {
    position: fixed;
    z-index: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    overflow: hidden;
    transform: translate3d(0px, 0px, 0px);
    height: -webkit-fill-available;
    background: radial-gradient(50% 50% at 50% 50%, rgb(255, 0, 122) 0%, rgb(247, 248, 250) 100%);
    opacity: 0.15;
    user-select: none;
    pointer-events: none;
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
.jumbotron-style {
    background: linear-gradient(
139.73deg
, rgb(229, 253, 255) 0%, rgb(243, 239, 255) 100%);
}
</style>

