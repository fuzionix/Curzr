<template>
  <code>
    {{ 
      language === 'html' 
        ? html 
        : language === 'javascript' 
          ? javascript 
          : vue 
    }}
  </code>
</template>

<script>
  /* eslint-disable no-useless-escape */
  export default {
    name: 'CodeGlitchEffect',
    components: {
    },
    props: {
      language: {
        type: String,
        required: true,
        validator: function (value) {
          return [
            'html',
            'javascript',
            'vue'
          ].indexOf(value) !== -1
        }
      },
      cursorsConfig: {
        type: Object,
        required: true
      }
    },
    computed: {
      html() {
        return `
<div class="curzr-glitch-effect"></div>`
      },
      javascript() {
        return `
class GlitchEffect {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr-glitch-effect")

    this.distanceX = 0, 
    this.distanceY = 0,
    this.pointerX = 0,
    this.pointerY = 0,
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.cursorSize = ${25 + (this.cursorsConfig.size / 5)}
    this.glitchColorB = '#00feff'
    this.glitchColorR = '#ff4f71'

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#222',
      borderRadius: '50%',
      boxShadow: \`0 0 0 \${this.glitchColorB}, 0 0 0 \${this.glitchColorR}\`,
      transition: '250ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    if (CSS.supports("backdrop-filter", "invert(1)")) {
      this.cursorStyle.backdropFilter = 'invert(1)'
      this.cursorStyle.backgroundColor = '#fff0'
    } else {
      this.cursorStyle.backgroundColor = '#222'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
  }

  move(event) {
    this.previousPointerX = this.pointerX
    this.previousPointerY = this.pointerY
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10) * 1.5
    this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10) * 1.5

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    } else {
      this.hoverout()
    }

    this.cursor.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
    this.cursor.style.boxShadow = \`
      \${+this.distanceX}px \${+this.distanceY}px 0 \${this.glitchColorB}, 
      \${-this.distanceX}px \${-this.distanceY}px 0 \${this.glitchColorR}\`
    this.stop()
  }

  hover() {
  }

  hoverout() {
  }

  click() {
    this.cursor.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  stop() {
    if (!this.moving) {
      this.moving = true
      setTimeout(() => {
        this.cursor.style.boxShadow = ''
        this.moving = false
      }, 50)
    }
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new GlitchEffect()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.onmousemove = function (event) {
      cursor.move(event)
    }
    document.onclick = function () {
      cursor.click()
    }
  } else {
    cursor.remove()
  }
})()`
      },
      vue() {
        return `
<template>
  <div ref="curzr" class="curzr-big-circle">
    <div class="circle" ref="curzrCircle"></div>
    <div class="dot" ref="curzrDot"></div>
  </div>
</template>

<script>
  export default {
    name: 'BigCircle',
    data() {
      return {
        pointerX: 0,
        pointerY: 0
      }
    },
    mounted() {
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.addEventListener('mousemove', (event) => {
          this.move(event, document.body)
        })
        document.body.addEventListener('click', () => {
          this.click()
        })
      } else {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    methods: {
      move(event, root) {
        this.pointerX = event.pageX + root.getBoundingClientRect().x
        this.pointerY = event.pageY + root.getBoundingClientRect().y
      
        this.$refs.curzrCircle.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
        this.$refs.curzrDot.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`

        if (event.target.localName === 'button' || 
            event.target.localName === 'a' || 
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
          this.hover()
        }
      },
      hover() {
        this.$refs.curzrCircle.style.transform += \` scale(1.5)\`
      },
      click() {
        this.$refs.curzrCircle.style.transform += \` scale(0.75)\`
        setTimeout(() => {
          this.$refs.curzrCircle.style.transform = this.$refs.curzrCircle.style.transform.replace(\` scale(0.75)\`, '')
        }, 35)
      }
    }
  }
<\/script>

<style>
.curzr-big-circle {
  --cursor-size: 100px;
  --cursor-delay: 100ms;
}

.curzr-big-circle .circle {
  position: fixed;
  top: calc(var(--cursor-size) / -2);
  left: calc(var(--cursor-size) / -2);
  transform: translate(-50%, -50%);
  width: var(--cursor-size);
  height: var(--cursor-size);
  background-color: #fff0;
  border-radius: 50%;
  transition: 500ms, transform var(--cursor-delay);
  user-select: none;
  pointer-events: none;
  backdrop-filter: invert(1) grayscale(1);
}

.curzr-big-circle .dot {
  position: fixed;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  background-color: #0007;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px #fffd;
  user-select: none;
  pointer-events: none;
  transition: 250ms, transform calc(var(--cursor-delay) * 0.75);
}
</style>`
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

code {
  font-family: $--fonts-style-y;
}
</style>