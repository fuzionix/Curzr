<template>
  <section id="search-bar" class="search-bar">
    <div class="search-container">
      <img src="../assets/icon/search-icon.svg" alt="search icon" width="24" height="24">
      <input type="text" placeholder="Search Pointer e.g. Arrow Pointer">
    </div>
    <div class="filter-container">
      <div class="filter-btn">
        <img src="../assets/icon/Filter.svg" alt="filter button" width="24" height="24">
        <filter-menu class="filter-menu"></filter-menu>
      </div>
      <div class="filtered-list">
        
      </div>
    </div>
  </section>
</template>

<script>
  import FilterMenu from '@/components/filter-menu.vue'

  export default {
    name: 'SearchBar',
    components: {
      'filter-menu': FilterMenu
    },
    data() {
      return {
        filterMenu: false
      }
    },
    computed: {
      
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.search-bar {
  display: flex;
  height: $--nav-height;
  margin-top: $--nav-height;
  padding-top: 1px;
  background-color: #fff;
  border-bottom: 1px solid $--section-line-color;

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    padding: 1rem 1.5rem;
    box-shadow: 1px 0 0 $--section-line-color;

    img {
      width: 24px;
      opacity: .2;
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      padding: 1rem 4rem;
      border: 1px solid transparentize($--theme-color, 1);
      outline: none;
      background-color: #fff0;
      font-size: .875rem;
      transition: 250ms;

      &:focus {
        border: 1px solid $--theme-color;
      }
    }
  }

  .filter-container {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    flex: 1;
    padding: 1rem 1.5rem;

    .filter-btn {
      @include flex-center;
      position: relative;
      width: 36px;
      height: 36px;
      padding: .5rem;
      border-radius: .5rem;
      background-color: #fff0;
      transition: 250ms;

      &:hover {
        background-color: $--section-line-color;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
        }

        .filter-menu {
          transition: 250ms;
          opacity: 1;
          visibility: visible;
        }

        img {
          width: 24px;
          height: auto;
          opacity: 1;
        }
      }

      &:active {
        background-color: darken($--section-line-color, 10%);
      }

      img {
        width: 24px;
        height: auto;
        opacity: .5;
        transition: 250ms;
      }

      .filter-menu {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    height: calc($--nav-height * 2);

    .filter-container {
      border-top: 1px solid $--section-line-color;
    }
  }
}
</style>