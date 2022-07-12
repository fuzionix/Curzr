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
    name: 'CodeBigCircle',
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
<div class="curzr" hidden>
  <div class="circle"></div>
  <div class="dot"></div>
</div>`
      },
      javascript() {
        return `
class BigCircle {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")
    this.circle = document.querySelector(".curzr .circle")
    this.dot = document.querySelector(".curzr .dot")

    this.pointerX = 0
    this.pointerY = 0
    this.cursorSize = ${100 + (this.cursorsConfig.size * 3)}

    this.circleStyle = {
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      zIndex: '2147483647',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#fff0',
      borderRadius: '50%',
      transition: '500ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.dotStyle = {
      position: 'fixed',
      zIndex: '2147483647',
      width: '6px',
      height: '6px',
      backgroundColor: '#fffd',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
      transition: '250ms, transform ${this.cursorsConfig.delay * 0.75}ms'
    }

    if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
      this.circleStyle.backdropFilter = 'invert(${this.cursorsConfig.filterInvert}) grayscale(1)'
      this.circleStyle.backgroundColor = '#fff0'
    } else {
      this.circleStyle.backgroundColor = '#000'
      this.circleStyle.opacity = '0.5'
    }

    this.init(this.circle, this.circleStyle)
    this.init(this.dot, this.dotStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    this.cursor.removeAttribute("hidden")
    ${
      !this.cursorsConfig.origin 
        ? 
    `
    document.body.style.cursor = 'none'
    document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
      el.style.cursor = 'inherit'
    })` 
        : 
    ``
    }
  }

  move(event) {
    this.pointerX = event.pageX
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
  
    this.circle.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
    this.dot.style.transform = \`translate3d(calc(-50% + \${this.pointerX}px), calc(-50% + \${this.pointerY}px), 0)\`

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    }
  }

  hover() {
    this.circle.style.transform += \` scale(1.5)\`
  }

  click() {
    this.circle.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.circle.style.transform = this.circle.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  remove() {
    this.circle.remove()
    this.dot.remove()
  }
}

(() => {
  const cursor = new BigCircle()
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