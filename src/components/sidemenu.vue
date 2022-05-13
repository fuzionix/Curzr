<template>
  <div id="sidemenu" class="sidemenu">
    <section class="logo">
      <img src="../assets/logo/curzr_logo-long.png" alt="curzr logo" width="100">
      <div class="slide-btn">
        <img src="../assets/icon/btn-arrow.svg" alt="button arrow" width="100">
      </div>
    </section>
    <section class="product-list">
      <small class="subtitle">Product</small>
      <div class="product-list-container">
        <div class="product-list-item">
          <a href="#" class="item-btn item-btn-active">
            <img src="../assets/icon/Shopping-bag-active.svg" alt="pointer store icon" width="20">
            <h6 class="item-name">Pointer Store</h6>
          </a>
        </div>
        <div class="product-list-item">
          <a href="#" class="item-btn">
            <img src="../assets/icon/Cursor.svg" alt="cursor builder icon" width="20">
            <h6 class="item-name">Cursor Builder</h6>
            <div class="status-badge status-badge-hot">HOT</div>
          </a>
        </div>
        <div class="product-list-item">
          <a href="#" class="item-btn">
            <img src="../assets/icon/Backpack.svg" alt="package icon" width="20">
            <h6 class="item-name">Package</h6>
            <div class="status-badge status-badge-new">NEW</div>
          </a>
        </div>
      </div>
    </section>
    <section class="adv-list">
      <small class="subtitle">Advertisement</small>
    </section>
    <section class="notification">
      4
    </section>
  </div>
</template>

<script>
  export default {
    name: 'side-menu',
    components: {
      
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
  overflow: scroll;
  box-shadow: 1px 0 0 $--section-line-color;
  transition: 250ms;

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

    .slide-btn {
      @include flex-center;
      position: absolute;
      right: 0;
      transform: translateX(50%);
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
    width: inherit;
    padding: 2rem;
    box-shadow: 0 1px 0 $--section-line-color;

    .subtitle {
      color: #a6a9b599;
    }
  }

  .notification {
    flex: 1;
    box-shadow: 0 1px 0 $--section-line-color;
  }
}
</style>