<template>
  <div id="navigation" class="navigation">
    <div class="slide-btn">
      <img src="../assets/icon/btn-arrow.svg" alt="button arrow" width="100">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navigation-bar',
    components: {
      
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.navigation {
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: $--nav-height;
  background-color: #fff;
  box-shadow: 0 1px 0 $--section-line-color;

  .slide-btn {
    @include flex-center;
    position: absolute;
    left: 0;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px $--section-line-color;
    transition: 250ms;
    
    &:hover {
      background-color: $--section-line-color;
    }

    img {
      position: relative;
      right: 1px;
      width: 12px;
    }
  }
}
</style>