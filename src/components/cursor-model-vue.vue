<template>
  <section id="cursor-model-vue" class="cursor-model-vue">
    <div class="block-container">
      <div class="subtitle">
        <img src="../assets/icon/vuejs-brands.svg" alt="html5 icon" width="12">
        <small>VUE 2</small>
      </div>
      <div class="code-block">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <pre><component 
          :is="codeBlock" 
          class="language-markup" 
          language="vue"
          ref="vueBlock">
        </component></pre>
        <copy-button :copied-text="vue"></copy-button>
      </div>
    </div>
  </section>
</template>

<script>
  import Prism from "prismjs"
  import "prismjs/themes/prism-tomorrow.css"

  import CopyButton from '@/components/elements/copy-button.vue'

  import CodeArrowPointer from '@/components/cursors_code/code-arrow-pointer.vue'

  export default {
    name: 'CursorModelVue',
    components: {
      'copy-button': CopyButton,
      'code-arrow-pointer': CodeArrowPointer
    },
    data() {
      return {
        codeBlock: 'code-arrow-pointer',
        vue: '',
      }
    },
    mounted() {
      window.Prism = window.Prism || {}
      window.Prism.manual = true
      Prism.highlightAll()

      this.vue = this.$refs.vueBlock.vue
    }
  }
</script>

<style lang="scss" scoped>
@import '../style/main.scss';

.cursor-model-vue {

  .block-container {
    margin-bottom: 1.5rem;

    .subtitle {
      display: flex;
      align-items: center;

      img {
        width: 12px;
        margin-right: .5rem;
      }
    }

    .code-block {
      position: relative;

      & ::-webkit-scrollbar {
        width: 0;
      }

      pre {
        padding: 1rem 1rem calc(1rem + 50px);
        border-radius: $--common-radius;
        background-color: #06252cee;
        font-size: .875rem;
        font-weight: 400;
        max-height: 400px;
        overflow: scroll;

        & ::selection {
          background-color: transparentize($--theme-color, 0.5);
        }

        code {
          font-family: $--fonts-style-y;
        }
      }

      .dots-container {
        position: absolute;
        display: flex;
        top: 0;
        left: 1rem;
        margin-top: 1rem;

        .dot {
          width: 10px;
          height: 10px;
          margin-right: .5rem;
          border-radius: 50%;
          background: #fff2;
        }
      }
    }
  }
}
</style>
