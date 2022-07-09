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
<div class="curzr">
  <div class="curzr-dot"></div>
</div>`
      },
      javascript() {
        return `
class RingDot {
  constructor() {
    this.root = document.body
    this.curzr = document.querySelector(".curzr")
    this.dot = document.querySelector(".curzr-dot")

    this.pointerX = 0
    this.pointerY = 0
    this.cursorSize = ${20 + (this.cursorsConfig.size / 5)}

    this.curzrStyle = {
      position: 'fixed',
      display: 'flex',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      justifyContent: 'center',
      alignItems: 'center',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#fff0',
      boxShadow: '0 0 0 1.25px #282828, 0 0 0 2.25px #f8f8f8',
      borderRadius: '50%',
      transition: '200ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.dotStyle = {
      position: 'fixed',
      width: '4px',
      height: '4px',
      backgroundColor: '#282828',
      boxShadow: '0 0 0 1px #f8f8f8',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
    }

    this.init(this.curzr, this.curzrStyle)
    this.init(this.dot, this.dotStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    ${
      !this.cursorsConfig.origin 
        ? 
    `
    document.body.style.cursor = 'none'
    document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
      el.style.cursor = 'none'
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
  
    this.curzr.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
  }

  hover(radius) {
    this.curzr.style.width = this.curzr.style.height = \`\${radius}px\`
    this.curzr.style.top = this.curzr.style.left = \`\${radius / -2}px\`
  }

  hoverout() {
    this.curzr.style.width = this.curzr.style.height = \`\${this.cursorSize}px\`
    this.curzr.style.top = this.curzr.style.left = \`\${this.cursorSize / -2}px\`
  }

  click() {
    this.curzr.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.curzr.style.transform = this.curzr.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  remove() {
    this.curzr.remove()
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
  <div ref="curzr" class="curzr-arrow-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#f2f5f8" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ArrowPointer',
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
        degrees: 57.296
      }
    },
    methods: {
      move(event) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + this.$root.$el.getBoundingClientRect().x
        this.position.pointerY = event.pageY + this.$root.$el.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY

        this.$refs.curzr.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

        this.rotate(this.position)
      },
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        this.previousAngle = this.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
          this.angle = 90 - unsortedAngle + 0
        } else if (position.distanceX < 0 && position.distanceY < 0) {
          this.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
          this.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
          this.angle = unsortedAngle + 270
        }

        if (isNaN(this.angle)) {
          this.angle = this.previousAngle
        } else {
          if (this.angle - this.previousAngle <= -270) {
            this.angleDisplace += 360 + this.angle - this.previousAngle
          } else if (this.angle - this.previousAngle >= 270) {
            this.angleDisplace += this.angle - this.previousAngle - 360
          } else {
            this.angleDisplace += this.angle - this.previousAngle
          }
        }
        this.$refs.curzr.style.transform += \` rotate(\${this.angleDisplace}deg)\`
      }
    }
  }
<\/script>

<style>
.curzr-arrow-pointer {
  --cursor-size:  20px;
  --cursor-delay: 100ms;

  position: fixed;
  top: 0;
  left: calc(var(--cursor-size) / -2);
  z-index: 2147483647;
  width: var(--cursor-size);
  height: var(--cursor-size);
  transition: 500ms, transform var(--cursor-delay);
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