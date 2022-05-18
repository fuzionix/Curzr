<template>
  <aside id="sidemenu" class="sidemenu">
    <section class="logo">
      <img src="../assets/logo/curzr_logo-long.png" alt="curzr logo" width="100">
    </section>
    <section class="product-list">
      <small class="subtitle">Product</small>
      <div class="product-list-container">
        <div class="product-list-item">
          <a href="#" class="item-btn" :class="{ 'item-btn-active': route.path === '/' }">
            <img v-if="route.path === '/'" src="../assets/icon/Shopping-bag-active.svg" alt="pointer library icon" width="20">
            <img v-else src="../assets/icon/Shopping-bag.svg" alt="pointer library icon" width="20">
            <h6 class="item-name">Pointer Library</h6>
          </a>
        </div>
        <div class="product-list-item">
          <a href="#" class="item-btn" :class="{ 'item-btn-active': route.path === '/builder' }">
            <img v-if="route.path === '/builder'" src="../assets/icon/Cursor-active.svg" alt="cursor builder icon" width="20">
            <img v-else src="../assets/icon/Cursor.svg" alt="cursor builder icon" width="20">
            <h6 class="item-name">Cursor Builder</h6>
            <div class="status-badge status-badge-hot">HOT</div>
          </a>
        </div>
        <div class="product-list-item">
          <a href="#" class="item-btn" :class="{ 'item-btn-active': route.path === '/package' }">
            <img v-if="route.path === '/package'" src="../assets/icon/Backpack-active.svg" alt="package icon" width="20">
            <img v-else src="../assets/icon/Backpack.svg" alt="package icon" width="20">
            <h6 class="item-name">Package</h6>
            <div class="status-badge status-badge-new">NEW</div>
          </a>
        </div>
      </div>
    </section>
    <section class="adv-list">
      <small class="subtitle">Advertisement</small>
      <div class="adv-content">
        This is ad content
      </div>
    </section>
    <section class="notification">
      <div class="message-container">
        <div class="message-block">
          <div class="close-btn">
            <img src="../assets/icon/close-btn.svg" alt="close button" width="20">
          </div>
          <div class="header">
            <img src="../assets/icon/noti-icon.svg" alt="notification icon" width="20">
            <h6 class="title">What's New</h6>
          </div>
          <div class="main-content">
            <p>
              The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine.
            </p>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
  export default {
    name: 'side-menu',
    components: {
      
    },
    data() {
      return {
        route: this.$router.currentRoute
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.sidemenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: $--sidemenu-width;
  height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid $--section-line-color;
  transition: 0, transform 250ms;

  .logo {
    position: relative;
    display: flex;
    align-items: center;
    width: inherit;
    height: $--nav-height;
    padding: 2rem;
    box-shadow: 0 1px 0 $--section-line-color;

    img {
      width: 135px;
    }
  }

  .product-list {
    display: flex;
    flex-direction: column;
    width: inherit;
    padding: 2rem 2rem;
    box-shadow: 0 1px 0 $--section-line-color;

    .subtitle {
      color: #a6a9b599;
    }

    .product-list-container {
      padding: 1rem 0 0;

      .product-list-item {
        display: flex;
        align-items: center;
        height: 40px;

        .item-btn {
          position: relative;
          width: 100%;
          display: flex;

          &:hover::before {
            @include sidemenu-active-bar(lighten($--theme-color, 20%));
          }

          &:hover > .item-name {
            opacity: .8;
          }

          img {
            width: 20px;
            margin-right: 1rem;
            opacity: .6;
            transition: 250ms, transform 500ms;
          }

          .item-name {
            margin-bottom: 1px;
            font-size: 1rem;
            font-variation-settings: 'wght' $--regular;
            opacity: .4;
            transition: 250ms;
          }

          .status-badge {
            display: flex;
            align-items: center;
            margin-left: auto;
            padding: 2px 8px;
            border-radius: 1rem;
            text-align: center;
            font-size: .75rem;
            color: #fff;
          }

          .status-badge-hot {
            background-color: #f5773c;
          }

          .status-badge-new {
            background-color: #0ac286;
          }
        }

        .item-btn-active > img, .item-btn-active > .item-name {
          color: darken($--theme-color, 15%);
          opacity: .75;
        }

        .item-btn-active::before {
          @include sidemenu-active-bar($--theme-color);
        }
      }
    }
  }

  .adv-list {
    display: flex;
    flex-direction: column;
    width: inherit;
    padding: 2rem;
    box-shadow: 0 1px 0 $--section-line-color;

    .subtitle {
      color: #a6a9b599;
    }

    .adv-content {
      padding: 1rem 0;
    }
  }

  .notification {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;

    .message-container {
      position: relative;
      z-index: 1;
      width: inherit;
      min-height: 150px;
      padding: 1.5rem 1rem;
      box-shadow: 0 -1px 0 $--section-line-color;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        bottom: -20px;
        right: 40px;
        width: 80px;
        height: 80px;
        background-color: #0ac295;
        border-radius: 50%;
      }

      &::after {
        content: '';
        position: absolute;
        top: 120px;
        left: -10px;
        width: 60px;
        height: 60px;
        background-color: #0ac2b4;
        border-radius: 50%;
        z-index: -1;
      }

      .message-block {        
        position: relative;
        border-radius: $--common-radius;
        background-color: darken(#f9f9fa77, 2.5%);
        padding: 1.5rem;
        backdrop-filter: blur(10px);

        .close-btn {
          position: absolute;
          top: 4px;
          right: 10px;
          transform: translate(-50%, -50%);
          transition: 250ms;

          &:hover {
            opacity: .8;
            cursor: pointer;
          }
          
          img {
            width: 20px;
          }
        }

        .header {
          display: flex;
          align-items: center;
          padding-bottom: 1rem;
          box-shadow: 0 1px 0 $--section-line-color;

          img {
            width: 24px;
            margin-right: 1rem;
          }

          .title {
            opacity: .4;
          }
        }

        .main-content {
          padding-top: 1rem;
          opacity: .8;
        }
      }
    }
  }
}
</style>