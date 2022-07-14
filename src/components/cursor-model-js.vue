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
          :cursors-config="cursorsConfig"
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
          :cursors-config="cursorsConfig"
          class="language-js" 
          language="javascript"
          ref="javascriptBlock">
        </component></pre>
        <copy-button :copiedText="javascript"></copy-button>
      </div>
    </div>
    <hr>
    <div class="guide-container">
      <h3 class="title">How To Use</h3>
      <ul class="description">
        <li>Place the HTML code in the <code>.html</code> file inside the <code>&lt;body&gt;</code> before <code>&lt;/body&gt;</code>.</li>
        <li>Place the JavaScript code in the <code>.js</code> file then reference in the <code>.html</code> file. The <code>&lt;script src="..."&gt;</code> should be also inside the <code>&lt;body&gt;</code> before the closing <code>&lt;/body&gt;</code>.</li>
        <li>Reload the page, then it should be done!</li>     
      </ul>
    </div>
    <div class="guide-container">
      <h3 class="title">Restriction</h3>
      <ul class="description">
        <li>Make sure there's no <code>margin</code> and <code>translate</code> applied to the root element <code>body</code>. It's suggested to include CSS Base file like <code>Reset.css</code> and <code>Normalize.css</code> before use.</li>
      </ul>
    </div>
    <div class="disclaimer-container">
      <h3 class="title">Disclaimer</h3>
      <ul class="description">
        <li>
          The original cursor is remained by default, but it can be removed manually in 'Edit Cursor'. 
          However, totally overriding the default cursor may affect the user experience since some of the custom cursors may lack the corresponding indication for indicating the current status.
          <br><br>
          It's totally welcome to use these cursors in your creative project. While using on the dashboard page or e-commerce website is not suggested. 
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import Prism from "prismjs"
  import "prismjs/themes/prism-tomorrow.css"
  import CopyButton from '@/components/elements/copy-button.vue'

  import Code from '@/components/module/cursors_code.js'

  export default {
    name: 'CursorModelJs',
    components: {
      'copy-button': CopyButton,

      'code-arrow-pointer': Code.CodeArrowPointer,
      'code-ring-dot': Code.CodeRingDot,
      'code-big-circle': Code.CodeBigCircle,
      'code-circle-and-dot': Code.CodeCircleAndDot,
      'code-glitch-effect': Code.CodeGlitchEffect,
      'code-motion-blur': Code.CodeMotionBlur
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
        html: '',
        javascript: ''
      }
    },
    mounted() {
      this.render()
    },
    methods: {
      render() {
        Promise.resolve().then(() => {
          window.Prism = window.Prism || {}
          window.Prism.manual = true
          Prism.highlightAll()

          this.html = this.$refs.htmlBlock.html
          this.javascript = this.$refs.javascriptBlock.javascript
        })
      }
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
        padding: 1rem 1rem calc(1rem + 75px);
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

  .guide-container, .disclaimer-container {
    
    .title {
      font-size: 1.5rem;
      font-variation-settings: 'wght' $--bold;
    }

    .description {
      font-size: .875rem;
      line-height: 2;
      list-style-type: lower-roman;
      word-spacing: 1px;
      opacity: .75;

      li {
        list-style-position: outside;
        margin-top: 1rem;
        margin-left: 1rem;
      }
    }

    code {
      font-weight: bold;
    }
  }

  .guide-container {
    padding: 0 2rem 3rem;
  }

  .disclaimer-container {
    padding: 2rem;
    background-color: lighten($--section-line-color, 2.5%);
    border-radius: $--common-radius;
  }

  hr {
    margin: 3rem 0 2rem;
    border: 1px solid $--section-line-color;
  }
}
</style>
