<template>
  <section id="main-model" class="main-model" @click="closeModelByOuterSpace($event)">
    <div class="model-block">
      <div class="block-left"
        @mousemove="move($event)"
        @mouseenter="init()"
        @mouseleave="reset()"
        ref="cursorBlock">
        <div class="close-btn" @click="closeModelByButton($event)">
          <img src="../assets/icon/close-btn.svg" alt="close button" width="20">
        </div>
        <div class="block-content">
          <h2 class="text">Move the cursor around</h2>
        </div>
        <component 
          :is="cursor"
          ref="cursor">
        </component>
      </div>
      <div class="block-right">
        <div class="block-content">
          <div class="cursor-type">
            <badge-tag>FREE</badge-tag>
          </div>
          <h5 class="cursor-name">Normal Cursor</h5>
          <div class="cursor-features">
            <normal-tag class="tag">Mulitple</normal-tag>
            <normal-tag class="tag">Click</normal-tag>
            <normal-tag class="tag">Hover</normal-tag>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import badge from '@/components/elements/badge.vue'
  import tag from '@/components/elements/tag.vue'

  import normalCursor from '@/components/cursors/normal-cursor.vue'

  export default {
    name: 'main-model',
    components: {
      'badge-tag': badge,
      'normal-tag': tag,
      'normal-cursor': normalCursor
    },
    data() {
      return {
        cursor: 'normal-cursor'
      }
    },
    methods: {
      init() {
        this.$refs.cursor.init()
      },
      move(event) {
        this.$refs.cursor.move(event, this.$refs.cursorBlock)
      },
      reset() {
        this.$refs.cursor.reset()
      },
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      position: relative;
      border-right: 1px solid $--section-line-color;
      background: $--background-sub-color;
      cursor: none;

      .block-content {
        padding: 1rem;

        .text {
          color: #eef0f5;
          text-align: center;
          font-variation-settings: 'wght' $--bold;
          line-height: 1;
          user-select: none;
        }
      }

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

      .block-content {
        min-height: 100%;
        padding: 2rem 1rem;
        background: rgb(52,220,255);
        background: 
          linear-gradient(30deg, rgb(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0.75) 100%), 
          linear-gradient(135deg, rgb(52, 220, 255) 0%, rgb(51, 255, 175) 100%);

        .cursor-type {
          width: 3.75rem;
          margin-left: -.25rem;
        }

        .cursor-name {
          margin-top: 1rem;
          letter-spacing: .5px;
        }

        .cursor-features {
          display: flex;
          flex-wrap: wrap;
          margin-top: 1rem;

          .tag {
            margin-right: .5rem;
            margin-bottom: .5rem;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1680px) {
  .main-model {
    padding: 2rem 1.5rem;
  }
}
</style>