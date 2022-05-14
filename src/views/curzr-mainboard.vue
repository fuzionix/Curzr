<template>
  <div id="mainboard" class="mainboard">
    <side-menu class="side-menu"></side-menu>
    <section class="main-section">
      <navigation-bar></navigation-bar>
    </section>
  </div>
</template>

<script>
  import navigation from '@/components/navigation.vue'
  import sidemenu from '../components/sidemenu.vue'
  
  export default {
    name: 'main-board',
    components: {
      'side-menu': sidemenu,
      'navigation-bar': navigation
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