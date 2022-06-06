<template>
  <section id="cursor-model" class="cursor-model" @click="closeModelByOuterSpace($event)">
    <div class="model-block">
      <div class="block-left"
        @mousemove="move($event)"
        @mouseenter="init()"
        @mouseleave="reset()"
        ref="cursorBlock">
        <div class="close-btn" @click="closeModelByButton($event)">
          <img src="../assets/icon/close-btn.svg" alt="close button" width="20">
        </div>
        <div class="cursor-features">
          <normal-tag class="tag">Mulitple</normal-tag>
          <normal-tag class="tag">Click</normal-tag>
          <normal-tag class="tag">Hover</normal-tag>
        </div>
        <div class="block-content">
          <h2 v-if="contentType === radioItems[0]" class="text">Move the cursor around</h2>
          <h2 v-else-if="contentType === radioItems[1]" class="text">Button</h2>
          <h2 v-else-if="contentType === radioItems[2]" class="text">Input Field</h2>
          <h2 v-else-if="contentType === radioItems[3]" class="text">Loading</h2>
        </div>
        <footer>
          <radio-group 
            class="content-type" 
            groupName="content-type"
            :radioItems="radioItems"
            @changeValue="changeContentType">
          </radio-group>
        </footer>
        <component 
          :is="cursor"
          ref="cursor">
        </component>
      </div>
      <div class="block-right">
        <cursor-model-viewcode class="block-content"></cursor-model-viewcode>
      </div>
    </div>
  </section>
</template>

<script>
  import viewcode from '@/components/cursor-model-viewcode.vue'
  import radioGroup from '@/components/elements/radio-group.vue'

  import normalCursor from '@/components/cursors/normal-cursor.vue'
  import tag from '@/components/elements/tag.vue'

  export default {
    name: 'cursor-model',
    components: {
      'cursor-model-viewcode': viewcode,
      'radio-group': radioGroup,
      'normal-tag': tag,
      'normal-cursor': normalCursor
    },
    data() {
      return {
        cursor: 'normal-cursor',
        radioItems: [
          'Text', 'Button', 'Input Field', 'Loading'
        ],
        contentType: 'Text'
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
      changeContentType(value) {
        this.contentType = value
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

.cursor-model {
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
      position: relative;
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

      .cursor-features {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        flex-wrap: wrap;

        .tag {
          margin-right: .5rem;
          margin-bottom: .5rem;
        }
      }

      footer {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 1.5rem 2rem;

        .content-type > * {
          cursor: none;
        }
      }
    }

    .block-right {
      position: relative;
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: -80px;
        width: 300px;
        height: 100px;
        background: url('../assets/dot-area.png');
        background-repeat: no-repeat;
        transform: rotate(45deg);
      }

      .block-content {
        min-height: 100%;
        padding: 2rem 1rem;
        background: rgb(52,220,255);
        background: 
          linear-gradient(45deg, rgb(255, 255, 255, 1) 75%, rgba(255, 255, 255, 0.75) 100%), 
          linear-gradient(135deg, rgb(52, 220, 255) 0%, rgb(51, 255, 175) 100%);
      }
    }
  }
}

@media only screen and (max-width: 1680px) {
  .cursor-model {
    padding: 2rem 1.5rem;
  }
}
</style>