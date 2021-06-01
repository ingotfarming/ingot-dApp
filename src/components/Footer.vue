<template>
<footer class="blog-footer">
  <div class="container">
      <p>Ingot Farming</p>
      <p>
        <a href="#">Back to top</a>
      </p>
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
  padding: 2.5rem 0;
  color: #999;
  text-align: center;
  background-color: #f9f9f9;
  border-top: .05rem solid #e5e5e5;

}
.blog-footer p:last-child {
  margin-bottom: 0;
}

</style>
