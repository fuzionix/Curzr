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
    name: 'CodeRingDot',
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
  <div class="curzr-dot"></div>
</div>`
      },
      javascript() {
        return `
class RingDot {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")
    this.dot = document.querySelector(".curzr-dot")

    this.pointerX = 0
    this.pointerY = 0
    this.cursorSize = ${20 + (this.cursorsConfig.size / 5)}

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      display: 'flex',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      zIndex: '2147483647',
      justifyContent: 'center',
      alignItems: 'center',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#fff0',
      boxShadow: '0 0 0 1.25px ${this.cursorsConfig.bodyColor}, 0 0 0 2.25px ${this.cursorsConfig.outlineColor}',
      borderRadius: '50%',
      transition: '200ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.dotStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      zIndex: '2147483647',
      width: '4px',
      height: '4px',
      backgroundColor: '${this.cursorsConfig.bodyColor}',
      boxShadow: '0 0 0 1px ${this.cursorsConfig.outlineColor}',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
    }

    this.init(this.cursor, this.cursorStyle)
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
    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover(40)
    } else {
      this.hoverout()
    }
    
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
  
    this.cursor.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
  }

  hover(radius) {
    this.cursor.style.width = this.cursor.style.height = \`\${radius}px\`
    this.cursor.style.top = this.cursor.style.left = \`\${radius / -2}px\`
  }

  hoverout() {
    this.cursor.style.width = this.cursor.style.height = \`\${this.cursorSize}px\`
    this.cursor.style.top = this.cursor.style.left = \`\${this.cursorSize / -2}px\`
  }

  click() {
    this.cursor.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  remove() {
    this.cursor.remove()
    this.dot.remove()
  }
}

(() => {
  const cursor = new RingDot()
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
  <div class="curzr" ref="curzr" hidden>
    <div class="dot"></div>
  </div>
</template>

<script>
  export default {
    name: 'RingDot',
    data() {
      return {
        pointerX: 0,
        pointerY: 0,
        cursorSize: 0
      }
    },
    computed: {
      cursorStyle() {
        return this.$refs.curzr.style
      }
    },
    mounted() {
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.cursorSize = Number(getComputedStyle(this.$refs.curzr).getPropertyValue('--size').slice(0, -2))
        this.$refs.curzr.removeAttribute("hidden")
        document.body.addEventListener('mousemove', (event) => {
          this.move(event, document.body)
        })
        document.body.addEventListener('click', () => {
          this.click()
        })
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
      } else {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    methods: {
      move(event, root) {
        if (event.target.localName === 'button' || 
            event.target.localName === 'a' || 
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
          this.hover(40)
        } else {
          this.hoverout(40)
        }

        this.pointerX = event.pageX + root.getBoundingClientRect().x
        this.pointerY = event.pageY + root.getBoundingClientRect().y

        this.cursorStyle.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
      },
      hover(radius) {
        this.cursorStyle.width = this.cursorStyle.height = \`\${radius}px\`
        this.cursorStyle.top = this.cursorStyle.left = \`\${radius / -2}px\`
      },
      hoverout() {
        this.cursorStyle.width = this.cursorStyle.height = \`\${this.cursorSize}px\`
        this.cursorStyle.top = this.cursorStyle.left = \`\${this.cursorSize / -2}px\`
      },
      click() {
        this.cursorStyle.transform += \` scale(0.75)\`
        setTimeout(() => {
          this.cursorStyle.transform = this.cursorStyle.transform.replace(\` scale(0.75)\`, '')
        }, 35)
      }
    }
  }
<\/script>

<style scoped>
.curzr {
  --size:  ${20 + (this.cursorsConfig.size / 5)}px;
  --delay: ${this.cursorsConfig.delay}ms;
  --body-color: ${this.cursorsConfig.bodyColor};
  --outline-color: ${this.cursorsConfig.outlineColor};

  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: '2147483647';
  width: var(--size);
  height: var(--size);
  transition: 200ms, transform var(--delay);
  background-color: #fff0;
  box-shadow: 0 0 0 1.25px var(--body-color), 0 0 0 2.25px var(--outline-color);
  border-radius: 50%;
  user-select: none;
  pointer-events: none;
}

.curzr .dot {
  box-sizing: border-box;
  position: 'fixed';
  top: 50%;
  left: 50%;
  z-index: '2147483647';
  width: 4px;
  height: 4px;
  background-color: var(--body-color);
  box-shadow: 0 0 0 1px var(--outline-color);
  border-radius: 50%;
  user-select: none;
  pointer-events: none;
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