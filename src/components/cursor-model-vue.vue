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
        <pre><code class="language-markup">{{ vue }}</code></pre>
        <copy-button :copiedText="vue"></copy-button>
      </div>
    </div>
  </section>
</template>

<script>
  /* eslint-disable no-useless-escape */
  import Prism from "prismjs"
  import "prismjs/themes/prism-tomorrow.css"

  import copyBtn from '@/components/elements/copy-button.vue'

  export default {
    name: 'cursor-model-vue',
    components: {
      'copy-button': copyBtn
    },
    mounted() {
      window.Prism = window.Prism || {}
      window.Prism.manual = true
      Prism.highlightAll()
    },
    data() {
      return {
        vue: 
        `
<template>
  <div id="big-circle" class="big-circle" ref="cursor">
    <div class="circle" ref="circle"></div>
    <small class="text" ref="text">MOVE</small>
  </div>
</template>

<script>
  export default {
    name: 'big-circle',
    data() {
      return {
        position: {
          distanceX: 0, 
          distanceY: 0,
          pointerX: 0,
          pointerY: 0,
        },
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296,
        trigger: false
      }
    },
    mounted() {
      const buttons = this.$refs.cursor.parentElement.parentElement.querySelectorAll('.curzr-hover')
      buttons.forEach(button => {
        button.addEventListener('mousemove', () => {
          this.hover()
        })
      })
      buttons.forEach(button => {
        button.addEventListener('mouseleave', () => {
          this.hoverout()
        })
      })
    },
    methods: {
      init() {
        this.initChild(this.$refs.cursor.childNodes)
      },
      initChild(nodes) {
        nodes.forEach(node => {
          node.style.top = 0
          node.style.left = 0
        })
      },
      move(event, cursorBlock) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.position.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY

        this.moveChild(this.$refs.cursor.childNodes)
      },
      moveChild(nodes) {
        nodes.forEach(node => {
          this.trigger ? null : node.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0)\`
        })
      },
      hover() {
        this.trigger = true
        this.$refs.circle.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0) scale(1.5)\`
        this.$refs.text.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0)\`
        this.$refs.text.innerHTML = 'ENTER'
      },
      hoverout() {
        this.trigger = false
        this.$refs.text.innerHTML = 'MOVE'
      },
      reset() {
        this.resetChild(this.$refs.cursor.childNodes)
      },
      resetChild(nodes) {
        nodes.forEach(node => {
          node.style.top = ''
          node.style.left = ''
          node.style.transform = ''
        })
      }
    }
  }
<\/script>

<style lang="scss">
.big-circle {
  --cursor-size: 100px;
  --cursor-transform: 100ms;

  .circle {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    width: var(--cursor-size);
    height: var(--cursor-size);
    background-color: #fff0;
    border-radius: 50%;
    transition: 500ms, transform var(--cursor-transform);
    user-select: none;
    pointer-events: none;
    backdrop-filter: invert(1) grayscale(1);
  }

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .875rem;
    color: #fff;
    letter-spacing: .25rem;
    text-indent: 0.25em;
    user-select: none;
    pointer-events: none;
    transition: 250ms, transform calc(var(--cursor-transform) * 0.75);
  }
}
</style>
        `
      }
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
