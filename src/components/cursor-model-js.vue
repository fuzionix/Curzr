<template>
  <section id="cursor-model-js" class="cursor-model-js">
    <div class="block-container">
      <small>HTML</small>
      <div class="code-block">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <pre><code class="language-html">{{ html }}</code></pre>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
    <div class="block-container">
      <small>JavaScript</small>
      <div class="code-block">
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <pre><code class="language-js">{{ javascript }}</code></pre>
        <button class="copy-btn">Copy</button>
      </div>
    </div>
  </section>
</template>

<script>
  import Prism from "prismjs"
  import "prismjs/themes/prism-tomorrow.css"

  export default {
    name: 'cursor-model-js',
    components: {
    },
    mounted() {
      window.Prism = window.Prism || {}
      window.Prism.manual = 
      Prism.highlightAll();
    },
    data() {
      return {
        html: 
        `
<div id="normal-cursor" class="normal-cursor" ref="cursor">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" />
    <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" />
  </svg>
</div>
        `,
        javascript:
        `
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
        `
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../style/main.scss';

.cursor-model-js {

  .block-container {
    margin-bottom: 1.5rem;

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
        max-height: 500px;
        overflow: scroll;

        & ::selection {
          background-color: transparentize($--theme-color, 0.5);
        }

        code {
          font-family: $--fonts-style-y;
        }
      }

      .copy-btn {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 2rem);
        height: 50px;
        border: 2px solid #fff2;
        border-radius: $--common-radius / 2;
        color: #fffd;
        background-color: #fff2;
        backdrop-filter: blur(3px);
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
