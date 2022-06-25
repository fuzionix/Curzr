<template>
  <section id="cursor-model-js" class="cursor-model-js">
    <div class="block-container">
      <div class="subtitle">
        <img src="../assets/icon/html5-brands.svg" alt="html5 icon" width="12" height="12">
        <small>HTML</small>
      </div>
      <div class="code-block">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <pre><component 
          :is="cursorData.componentCodeblock" 
          class="language-html" 
          language="html"
          ref="htmlBlock">
        </component></pre>
        <copy-button :copiedText="html"></copy-button>
      </div>
    </div>
    <div class="block-container">
      <div class="subtitle">
        <img src="../assets/icon/js-square-brands.svg" alt="javascript icon" width="12" height="12">
        <small>JavaScript</small>
      </div>
      <div class="code-block">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <pre><component 
          :is="cursorData.componentCodeblock" 
          class="language-js" 
          language="javascript"
          ref="javascriptBlock">
        </component></pre>
        <copy-button :copiedText="javascript"></copy-button>
      </div>
    </div>
  </section>
</template>

<script>
  import Prism from "prismjs"
  import "prismjs/themes/prism-tomorrow.css"
  import CopyButton from '@/components/elements/copy-button.vue'

  import CodeArrowPointer from '@/components/cursors_code/code-arrow-pointer.vue'
  import CodeBigCircle from '@/components/cursors_code/code-big-circle.vue'

  export default {
    name: 'CursorModelJs',
    components: {
      'copy-button': CopyButton,
      'code-arrow-pointer': CodeArrowPointer,
      'code-big-circle': CodeBigCircle
    },
    props: {
      cursorData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        html: '',
        javascript: ''
      }
    },
    watch: {
      cursorData: {
        handler() {
          Promise.resolve().then(() => {
            window.Prism = window.Prism || {}
            window.Prism.manual = true
            Prism.highlightAll()

            this.html = this.$refs.htmlBlock.html
            this.javascript = this.$refs.htmlBlock.javascript
          })
        },
        deep: true
      }
    },
    mounted() {
      // Render code content
      window.Prism = window.Prism || {}
      window.Prism.manual = true
      Prism.highlightAll()

      this.html = this.$refs.htmlBlock.html
      this.javascript = this.$refs.htmlBlock.javascript
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-model-js {

  .block-container {
    margin-bottom: 1.5rem;

    .subtitle {
      display: flex;
      align-items: center;

      img {
        width: 12px;
        height: auto;
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
