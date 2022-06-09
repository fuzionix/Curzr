<template>
  <section id="mainboard" class="mainboard">
    <side-menu class="side-menu"></side-menu>
    <section class="main-section">
      <navigation-bar>
      </navigation-bar>
      <search-bar></search-bar>
      <adjustment-bar
        :cursorConfig="cursorConfig"
        @changeRangeValue="changeRangeValue"
      >
      </adjustment-bar>
      <cursor-content
        :cursorsData="cursorsData">
      </cursor-content>
      <footer-content></footer-content>
    </section>
  </section>
</template>

<script>
  import SideMenu from '@/components/sidemenu.vue'
  import NavigationBar from '@/components/navigation.vue'
  import SearchBar from '@/components/search-bar.vue'
  import AdjustmentBar from '@/components/adjustment-bar.vue'
  import CursorContent from '@/components/cursor-content.vue'
  import FooterContent from '@/components/footer.vue'

  import CursorsData from '@/json/cursors_data.json'
  
  export default {
    name: 'MainBoardPage',
    components: {
      'side-menu': SideMenu,
      'navigation-bar': NavigationBar,
      'search-bar': SearchBar,
      'adjustment-bar': AdjustmentBar,
      'cursor-content': CursorContent,
      'footer-content': FooterContent
    },
    data() {
      return {
        cursorConfig: {
          size: 25,
          delay: 500
        },
        cursorsData: CursorsData
      }
    },
    computed: {
      
    },
    mounted() {

    },
    methods: {
      changeRangeValue(event) {
        switch (event.id) {
          case 'range-size':
            this.cursorConfig.size = parseInt(event.value)
            break
          case 'range-delay':
            this.cursorConfig.delay = parseInt(event.value)
            break
        }
      }
    },
    metaInfo: {
      title: 'Pointer Library',
      titleTemplate: '%s | Curzr'
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
    transition: 500ms;
  }
}

@media only screen and (max-width: 1024px) {
  .mainboard {

    .main-section {
      padding-left: 0;
    }
  }
}
</style>