<template>
  <section id="navigation-plain" class="navigation-plain">
    <a href="../" class="logo-btn">
      <img src="../assets/logo/curzr_logo-long.png" alt="curzr logo" width="135">
    </a>
    <a href="https://github.com/TaylonChan/Curzr" target="_blank" class="github-btn">
      <img src="../assets/icon/github.png" alt="github button" width="20">
      <h6 class="btn-name"><span>GITHUB</span></h6>
    </a>
  </section>
</template>

<script>
  export default {
    name: 'NavigationBarPlain',
    components: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.navigation-plain {
  --sidebar-status: 1;

  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: $--nav-height;
  background-color: #fff;
  box-shadow: 0 1px 0 $--section-line-color;
  transition: 500ms;

  .logo-btn {
    display: flex;
    align-items: center;
    width: 100px;
    height: 100%;
    padding: 2rem;
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

@media only screen and (max-width: 1024px) {
  .navigation-plain {
    width: 100%;
    .github-btn {
      img {
        margin-right: 0;
      }
      span {
        display: none;
      }
    }
  }
}
</style>