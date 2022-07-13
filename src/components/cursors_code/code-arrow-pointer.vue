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
    name: 'CodeArrowPointer',
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="${this.cursorsConfig.bodyColor}" />
    <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="${this.cursorsConfig.outlineColor}" />
  </svg>
</div>`
      },
      javascript() {
        return `
class ArrowPointer {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")

    this.position = {
      distanceX: 0, 
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    },
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.angle = 0
    this.previousAngle = 0
    this.angleDisplace = 0
    this.degrees = 57.296
    this.cursorSize = ${20 + (this.cursorsConfig.size / 5)}

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: '0px',
      left: \`\${ -this.cursorSize / 2 }px\`,
      zIndex: '2147483647',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      transition: '250ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
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
    this.previousPointerX = this.position.pointerX
    this.previousPointerY = this.position.pointerY
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.position.distanceX = this.previousPointerX - this.position.pointerX
    this.position.distanceY = this.previousPointerY - this.position.pointerY
    this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)
  
    this.cursor.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

    if (this.distance > 1) {
      this.rotate(this.position)
    } else {
      this.cursor.style.transform += \` rotate(\${this.angleDisplace}deg)\`
    }
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
    let modAngle
    const style = this.cursor.style
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
    style.transform += \` rotate(\${this.angleDisplace}deg)\`

    setTimeout(() => {
      modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
      if (modAngle >= 45 && modAngle < 135) {
        style.left = \`\${ -this.cursorSize }px\`
        style.top = \`\${ -this.cursorSize / 2 }px\`
      } else if (modAngle >= 135 && modAngle < 225) {
        style.left = \`\${ -this.cursorSize / 2 }px\`
        style.top = \`\${ -this.cursorSize }px\`
      } else if (modAngle >= 225 && modAngle < 315) {
        style.left = '0px'
        style.top = \`\${ -this.cursorSize / 2 }px\`
      } else {
        style.left = \`\${ -this.cursorSize / 2 }px\`
        style.top = '0px'
      }
    }, 0)
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new ArrowPointer()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {    
    document.onmousemove = function (event) {
      cursor.move(event)
    }
  } else {
    cursor.remove()
  }
})()`
      },
      vue() {
        return `
<template>
  <div ref="curzr" class="curzr" hidden>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" />
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
          distance: 0,
          pointerX: 0,
          pointerY: 0,
        },
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296,
        cursorSize: 0,
      }
    },
    mounted() {
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.cursorSize = Number(getComputedStyle(this.$refs.curzr).getPropertyValue('--size').slice(0, -2))
        this.$refs.curzr.removeAttribute("hidden")
        document.body.addEventListener('mousemove', (event) => {
          this.move(event, document.body)
        })
      } else {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    methods: {
      move(event, root) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + root.getBoundingClientRect().x
        this.position.pointerY = event.pageY + root.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        this.$refs.curzr.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

        if (this.distance > 1) {
          this.rotate(this.position)
        } else {
          this.$refs.curzr.style.transform += \` rotate(\${this.angleDisplace}deg)\`
        }
      },
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        let modAngle
        const style = this.$refs.curzr.style
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
        style.transform += \` rotate(\${this.angleDisplace}deg)\`

        setTimeout(() => {
          modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
          if (modAngle >= 45 && modAngle < 135) {
            style.left = \`\${ -this.cursorSize }px\`
            style.top = \`\${ -this.cursorSize / 2 }px\`
          } else if (modAngle >= 135 && modAngle < 225) {
            style.left = \`\${ -this.cursorSize / 2 }px\`
            style.top = \`\${ -this.cursorSize }px\`
          } else if (modAngle >= 225 && modAngle < 315) {
            style.left = '0px'
            style.top = \`\${ -this.cursorSize / 2 }px\`
          } else {
            style.left = \`\${ -this.cursorSize / 2 }px\`
            style.top = '0px'
          }
        }, 0)
      }
    }
  }
<\/script>

<style>
.curzr {
  --size:  20px;
  --delay: 100ms;
  --body-color: #F2F5F8;
  --outline-color: #111920;

  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: calc(var(--size) / -2);
  z-index: 2147483647;
  width: var(--size);
  height: var(--size);
  transition: 500ms, transform var(--delay);
  user-select: none;
  pointer-events: none;
}

.curzr .inner {
  fill: var(--body-color);
}

.curzr .outer {
  fill: var(--outline-color);
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