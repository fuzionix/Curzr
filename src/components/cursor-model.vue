<template>
  <section id="cursor-model" class="cursor-model" @click="closeModelByOuterSpace($event)">
    <div class="model-block">
      <div class="block-left"
        @[eventName]="move($event)"
        @mouseenter="init()"
        @touchstart="init()"
        @mouseleave="reset()"
        ref="cursorBlock">
        <button class="close-btn" @click="closeModelByButton($event)">
          <img src="../assets/icon/close-btn.svg" alt="close button" width="20" height="20">
        </button>
        <div class="cursor-features">
          <normal-tag 
            v-for="(feature, index) in cursorData.features" 
            :key="index" 
            class="tag"
          >
            {{ feature }}
          </normal-tag>
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
            :radio-items="radioItems"
            @changeValue="changeContentType">
          </radio-group>
        </footer>
        <component 
          :is="cursorData.componentName"
          :cursors-config="cursorsConfig"
          ref="cursor">
        </component>
      </div>
      <div 
        class="block-right" 
        :class="[model === 'cursor-model-viewcode' ? 'block-right-viewcode' : 'block-right-edit']">
        <transition name="fade" mode="out-in" :duration="500">
          <keep-alive>
            <component 
              :is="model" 
              :cursor-data="cursorData"
              :cursors-config="cursorsConfig"
              class="block-content"
              @changeModel="changeModel"
              @changeRangeValue="changeRangeValue"
              @changeCheckedValue="changeCheckedValue"
            >
            </component>
          </keep-alive>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
  import CursorModelViewcode from '@/components/cursor-model-viewcode.vue'
  import CursorModelEdit from '@/components/cursor-model-edit.vue'
  import RadioGroup from '@/components/elements/radio-group.vue'

  import Cursors from '@/components/module/cursors.js'

  import NormalTag from '@/components/elements/tag.vue'

  export default {
    name: 'CursorModel',
    components: {
      'cursor-model-viewcode': CursorModelViewcode,
      'cursor-model-edit': CursorModelEdit,
      'radio-group': RadioGroup,
      'normal-tag': NormalTag,

      'arrow-pointer': Cursors.ArrowPointer,
      'ring-dot': Cursors.RingDot,
      'big-circle': Cursors.BigCircle,
      'circle-and-dot': Cursors.CircleAndDot,
      'glitch-effect': Cursors.GlitchEffect,
      'motion-blur': Cursors.MotionBlur
    },
    props: {
      model: {
        type: String,
        required: true,
        validator: function (value) {
          return [
            'cursor-model-viewcode',
            'cursor-model-edit'
          ].indexOf(value) !== -1
        }
      },
      cursorData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        cursorsConfig: {
          size: 0,
          delay: 100,
          origin: true
        },
        radioItems: [
          'Text', 'Button', 'Input Field', 'Loading'
        ],
        contentType: 'Text',
        eventName: ''
      }
    },
    mounted() {
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.eventName = 'mousemove'
      } else {
        this.eventName = 'touchmove'
      }
    },
    methods: {
      /**
       * Every cursor has its own init method @see /components/cursors/
       */
      init() {
        this.$refs.cursor ?. init()
      },
      /**
       * Every cursor has its own move method @see /components/cursors/
       * 
       * @param {object} event
       */
      move(event) {
        if (this.eventName === 'touchmove') {
          this.$refs.cursor ?. move(event.touches[0], this.$refs.cursorBlock)
        } else {
          this.$refs.cursor ?. move(event, this.$refs.cursorBlock)
        }
      },
      /**
       * Every cursor has its own reset method @see /components/cursors/
       */
      reset() {
        this.$refs.cursor ?. reset()
      },
      /**
       * Change the content displayed in the center
       * 
       * @param {string} value
       * @event changeValue
       * 
       * @values text, button, input field, loading
       */
      changeContentType(value) {
        this.contentType = value
      },
      /**
       * Emit the model value to the parent
       * 
       * @param {string} model
       * @event changeModel
       */
      changeModel(model) {
        this.$emit('changeModel', model)
      },
      /**
       * Change the property value of cursorsConfig by the data from the <range-bar>
       * 
       * @param {object} event
       * @event changeRangeValue
       */
      changeRangeValue(event) {
        switch (event.id) {
          case 'edit-size':
            this.cursorsConfig.size = parseInt(event.value)
            break
          case 'edit-delay':
            this.cursorsConfig.delay = parseInt(event.value)
            break
        }
      },
      /**
       * Change the property value of cursorsConfig by the data from the <switch-button>
       * 
       * @param {object} event
       * @event changeCheckedValue
       */
      changeCheckedValue(event) {
        this.cursorsConfig.origin = event
      },
      /**
       * Close the model when click on the area that is not in the model
       * 
       * @param {object} event
       */
      closeModelByOuterSpace(event) {
        if (event.target === this.$el) {
          this.$emit('changeModelStatus', false)
        }
      },
      /**
       * Close the model when click on the close button
       */
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
    height: 100%;
    background: #fff;
    border-radius: $--common-radius;
    overflow: hidden;
    touch-action: none;

    .block-left {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      border-right: 1px solid $--section-line-color;
      background: $--background-sub-color;
      transition: 500ms;

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
        z-index: 1;
        border: none;
        opacity: .5;
        transition: 250ms;

        img {
          width: 20px;
          height: auto;
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
        flex-direction: row-reverse;
        flex-wrap: wrap;
        padding-left: 5rem;

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
      }
    }

    .block-right {
      position: relative;
      overflow-x: hidden;
      overflow-y: scroll;
      transition: 500ms;      

      .block-content {
        min-height: 100%;
        padding: 2rem 1rem;
      }
    }

    .block-right-viewcode {
      width: 50%;
    }

    .block-right-edit {
      width: 300px;
    }
  }
}

@media only screen and (max-width: 1680px) {
  .cursor-model {
    padding: 2rem 1.5rem;
  }
}

@media only screen and (max-width: 1024px) {
  .cursor-model {
    
    .model-block {
      overflow: scroll;
      flex-direction: column;

      .block-left {
        flex: 0;

        .block-content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 400px;
        }
      }

      .block-right {
        width: 100%;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .cursor-model {
    .model-block {
      .block-left {
        .block-content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 300px;
        }

        footer {
          .content-type {
            .radio-item {
              .item-name {
                padding: .5rem;
                font-size: .75rem;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .cursor-model {
    padding: 1rem;
  }
}
</style>