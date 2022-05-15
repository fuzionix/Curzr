<template>
  <div id="mainboard" class="mainboard">
    <side-menu class="side-menu"></side-menu>
    <section class="main-section">
      <navigation-bar></navigation-bar>
      <search-bar></search-bar>
      <adjustment-bar></adjustment-bar>
    </section>
  </div>
</template>

<script>
  import sidemenu from '@/components/sidemenu.vue'
  import navigation from '@/components/navigation.vue'
  import searchbar from '@/components/search-bar.vue'
  import adjustmentbar from '@/components/adjustment-bar.vue'
  
  export default {
    name: 'main-board',
    components: {
      'side-menu': sidemenu,
      'navigation-bar': navigation,
      'search-bar': searchbar,
      'adjustment-bar': adjustmentbar
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.mainboard {
  display: flex;
  min-height: 100vh;
  background-color: #fcfcfc;

  .main-section {
    width: 100%;
    padding-left: $--sidemenu-width;
  }
}
</style>