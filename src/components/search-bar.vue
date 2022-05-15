<template>
  <div id="search-bar" class="search-bar">
    <div class="search-container">
      <img src="../assets/icon/search-icon.svg" alt="search icon" width="24">
      <input type="text" placeholder="Search Pointer e.g. Normal Pointer">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search-bar',
    components: {
      
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.search-bar {
  display: flex;
  height: $--nav-height;
  margin-top: $--nav-height;
  background-color: #fff;
  border-bottom: 1px solid $--section-line-color;

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 50%;
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
}
</style>