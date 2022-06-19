<template>
  <div 
    id="app"
    class="app"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
  },
  mounted() {
  },
  methods: {

  },
  metaInfo: {
    meta: [
      {
        name: 'description',
        content: 'Curzr is a website which provides tools and resources that help you to create a fascinating, interesting, and animated cursor by just a ‘copy and paste’.',
      },
      {
        ['http-equiv']: 'Content-Security-Policy',
        content: "default-src 'self'; img-src * 'self' data: https:; child-src 'none'; font-src *; script-src * 'unsafe-eval'; style-src 'unsafe-inline'; style-src-elem * 'unsafe-inline'; connect-src *"
      }
    ]
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300&family=Plus+Jakarta+Sans:wght@200;500;800&display=swap');
</style>
