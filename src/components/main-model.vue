<template>
  <section id="main-model" class="main-model" @click="closeModelByOuterSpace($event)">
    <div class="model-block">
      <div class="block-left">
        <div class="close-btn" @click="closeModelByButton($event)">
          <img src="../assets/icon/close-btn.svg" alt="close button" width="20">
        </div>
      </div>
      <div class="block-right"></div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'main-model',
    components: {
      
    },
    data() {
      return {

      }
    },
    methods: {
      closeModelByOuterSpace(event) {
        if (event.target === this.$el) {
          this.$emit('changeModelStatus', false)
        }
      },
      closeModelByButton() {
        this.$emit('changeModelStatus', false)
      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.main-model {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 14;
  width: 100%;
  height: 100vh;
  padding: 5rem 1.5rem;
  background: #96969648;
  transition: 250ms;

  .model-block {
    display: flex;
    width: 1400px;
    min-width: 500px;
    height: 100%;
    background: #fff;
    border-radius: $--common-radius;
    overflow: hidden;

    .block-left {
      flex: 1;
      position: relative;
      border-right: 1px solid $--section-line-color;
      background: $--background-sub-color;

      .close-btn {
        position: absolute;
        top: 20px;
        left: 20px;
        opacity: .5;
        transition: 250ms;

        img {
          width: 20px;
        }

        &:hover {
          opacity: .75;
        }
      }
    }

    .block-right {
      flex: 1;
    }
  }
}
</style>