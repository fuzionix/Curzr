<template>
  <div id="navigation" class="navigation">
    <div class="slide-btn">
      <img src="../assets/icon/btn-arrow.svg" alt="button arrow" width="100">
    </div>
    <a href="#" class="github-btn">
      <img src="../assets/icon/github.png" alt="github button" width="20">
      <h6 class="btn-name">GITHUB</h6>
    </a>
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
  justify-content: flex-end;
  align-items: center;
  z-index: 1;
  width: calc(100% - $--sidemenu-width);
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

  .github-btn {
    display: flex;
    align-items: center;
    height: 100%;
    border-left: 1px solid $--section-line-color;
    padding: 1rem 2rem;
    transition: 250ms;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #fff;

    &:hover {
      background-image: url('../assets/github-background.png');

      & > img, > .btn-name {
        filter: invert(100%);
      }
    }

    img {
      margin-right: 1rem;
    }

    .btn-name {
      letter-spacing: 2px;
    }
  }
}
</style>