<template>
  <section 
    id="cursor-block" 
    class="cursor-block" 
    ref="cursorBlock"
    @mousemove="move($event)"
    @mouseenter="init()"
    @mouseleave="reset()">
    <header>
      <div class="cursor-type">
        <badge-tag>FREE</badge-tag>
      </div>
      <div class="cursor-features">
        <normal-tag 
          v-for="(feature, index) in cursorData.features"
          class="tag"
          :key="index">
          {{ feature }}
        </normal-tag>
      </div>
    </header>
    <main>
      <component 
        :is="cursorData.componentName"
        :cursors-config="cursorsConfig"
        ref="cursor">
      </component>
    </main>
    <footer>
      <div class="cursor-name">{{ cursorData.cursorName }}</div>
      <div class="button-section">
        <normal-button 
          class="normal-btn button-transparent curzr-hover" 
          @click.native="openModel('cursor-model-edit')"
        >
          <img src="../assets/icon/Customization.svg" alt="" width="20" height="20">
          <small>Edit</small>
        </normal-button>
        <tilted-button 
          class="tilted-btn curzr-hover" 
          @click.native="openModel('cursor-model-viewcode')"
        >
          View Code
        </tilted-button>
      </div>
    </footer>
    <div class="block-mask"></div>
  </section>
</template>

<script>
  import BadgeTag from '@/components/elements/badge.vue'
  import NormalTag from '@/components/elements/tag.vue'
  import NormalButton from '@/components/elements/normal-button.vue'
  import TiltedButton from '@/components/elements/tilted-button.vue'

  import ArrowPointer from '@/components/cursors/arrow-pointer.vue'
  import BigCircle from '@/components/cursors/big-circle.vue'

  export default {
    name: 'CursorBlock',
    components: {
      'badge-tag': BadgeTag,
      'normal-tag': NormalTag,
      'normal-button': NormalButton,
      'tilted-button': TiltedButton,
      'arrow-pointer': ArrowPointer,
      'big-circle': BigCircle
    },
    props: {
      cursorData: {
        type: Object,
        required: true
      },
      cursorsConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
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
      openModel(model) {
        this.$emit('changeModelStatus', {
          modelStatus: true,
          model: model
        })
      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-block {
  --bg-color: #fff;
  --dot-color: #669098;
  --dot-size: 1px;
  --dot-space: 7.5px;
  
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: #fff;
  background: 
    linear-gradient(90deg, var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, 
    linear-gradient(var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, var(--dot-color);
  background-size: var(--dot-space) var(--dot-space);
  background-position: center;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }

  &:hover footer .cursor-name {
    opacity: 1;
  }

  &:hover footer .normal-btn {
    cursor: pointer;
  }

  &:hover footer .tilted-btn {
    cursor: pointer;
  }

  &:hover .block-mask {
    opacity: 0;
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: .5;
  }

  header {
    display: flex;
    justify-content: space-between;
    z-index: 4;
    padding: .75rem 1.5rem;

    .cursor-features {
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: wrap;

      .tag {
        margin-left: .5rem;
        margin-bottom: .5rem;
      }
    }
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 4;
    padding: .75rem 1.5rem;

    .cursor-name {
      transition: 500ms;
      opacity: 0;
    }

    .button-section {
      display: flex;
      align-items: flex-end;

      button:first-child {
        margin-right: .75rem;
      }

      .normal-btn {
        height: 44px;
        padding: .875rem 1.5rem;

        &:hover {
          filter: contrast(0);
        }

        img {
          width: 20px;
          height: auto;
          margin-right: .5rem;
        }
      }
    }
  }

  .block-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    opacity: 1;
    transition: 250ms;
  }
}
</style>