<template>
<footer class="blog-footer">
  <div class="container">
      <div class="copyright-wrap d-md-flex py-4">
        <div class="mr-md-auto text-center text-md-left">
          <div class="copyright">
            <strong><span>Ingot Farming</span></strong>
          </div>
         </div>
        <div class="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="https://twitter.com/IngotFarming" target="_blank" class="twitter"><i class="fab fa-twitter"></i></a>
          <a href="https://t.me/ingotfarming" target="_blank"  class="facebook"><i class="fab fa-telegram"></i></a>
          <a href="https://github.com/ingotfarming?tab=repositories" target="_blank"  class="facebook"><i class="fab fa-github"></i></a>
          <a href="https://ingotfarming.medium.com" target="_blank" class="instagram"><i class="fab fa-medium"></i></a>
        </div>
      </div>
      </div>
    </footer>
</template>

<script>


export default {
  name: 'Footer',
  components: {
  },
  props: {

  },
  data: function() {
    return {
              
    }
  },
  computed:{ },
  methods: { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
 * Footer
 */
.blog-footer {
  padding: 0.5rem 0;
  color: #999;
  text-align: center;
  background-color: #f9f9f9;
  border-top: .05rem solid #e5e5e5;

}
.blog-footer p:last-child {
  margin-bottom: 0;
}

.blog-footer .credits {
  padding-top: 5px;
  font-size: 13px;
  color: #fff;
}
.copyright{
  color: black;
}
.blog-footer .social-links a {
  font-size: 25px;
  display: inline-block;
  background: rgb(255, 255, 255);
  line-height: 1;
  padding: 8px 0;
  margin-right: 4px;
  border-radius: 50%;
  text-align: center;
  width: 36px;
  height: 36px;
  transition: 0.3s;
  color: rgb(0, 0, 0);
}

.blog-footer .social-links a:hover {
  background: rgb(255, 255, 255);
  color: rgba(41, 41, 41, 0.541);
  text-decoration: none;
}
</style>
