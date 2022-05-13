<template>
  <div id="mainboard" class="mainboard">
    <side-menu class="side-menu"></side-menu>
  </div>
</template>

<script>
  import sidemenu from '../components/sidemenu.vue'
  
  export default {
    name: 'main-board',
    components: {
      'side-menu': sidemenu
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">

</style>