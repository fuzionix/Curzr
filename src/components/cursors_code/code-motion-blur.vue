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
    name: 'CodeMotionBlur',
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
<svg class="curzr" hidden>
  <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
    <feGaussianBlur class="curzr-motion-blur" stdDeviation="0, 0"/>
  </filter>
  <circle cx="50%" cy="50%" r="${10 + (this.cursorsConfig.size / 5)}" fill="${this.cursorsConfig.bodyColor}" filter="url(#motionblur)" />
</svg>`
      },
      javascript() {
        return `
class MotionBlur {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")
    this.filter = document.querySelector(".curzr-motion-blur")

    this.position = {
      distanceX: 0, 
      distanceY: 0,
      pointerX: 0,
      pointerY: 0,
    },
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.angle = 0
    this.previousAngle = 0
    this.angleDisplace = 0
    this.degrees = 57.296
    this.cursorSize = ${25 + (this.cursorsConfig.size / 5)}
    this.moving = false

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      zIndex: '2147483647',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      borderRadius: '50%',
      overflow: 'visible',
      transition: '200ms, transform ${this.cursorsConfig.delay / 10}ms',
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
    this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20)
    this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20)

    this.cursor.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`
    this.rotate(this.position)
    this.moving ? this.stop() : this.moving = true
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
    
    if (isNaN(unsortedAngle)) {
      this.angle = this.previousAngle
    } else {
      if (unsortedAngle <= 45) {
        if (position.distanceX * position.distanceY >= 0) {
          this.angle = +unsortedAngle
        } else {
          this.angle = -unsortedAngle
        }
        this.filter.setAttribute('stdDeviation', \`\${Math.abs(this.position.distanceX / 2)}, 0\`)
      } else {
        if (position.distanceX * position.distanceY <= 0) {
          this.angle = 180 - unsortedAngle
        } else {
          this.angle = unsortedAngle
        }
        this.filter.setAttribute('stdDeviation', \`\${Math.abs(this.position.distanceY / 2)}, 0\`)
      }
    }
    this.cursor.style.transform += \` rotate(\${this.angle}deg)\`
    this.previousAngle = this.angle
  }

  stop() {
    setTimeout(() => {
      this.filter.setAttribute('stdDeviation', '0, 0')
      this.moving = false
    }, 50)
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new MotionBlur()
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
  <svg class="curzr" ref="curzr" hidden>
    <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
      <feGaussianBlur class="motion-blur" stdDeviation="0, 0"/>
    </filter>
    <circle cx="50%" cy="50%" r="10" fill="#120d27" filter="url(#motionblur)" />
  </svg>
</template>

<script>
  export default {
    name: 'MotionBlur',
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
        moving: false
      }
    },
    computed: {
      cursorStyle() {
        return this.$refs.curzr.style
      },
      motionBlur() {
        return this.$refs.curzr.querySelector('.motion-blur')
      }
    },
    mounted() {
      if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.$refs.curzr.removeAttribute("hidden")
        document.body.addEventListener('mousemove', (event) => {
          this.move(event, document.body)
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
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + root.getBoundingClientRect().x
        this.position.pointerY = event.pageY + root.getBoundingClientRect().y
        this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20)
        this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20)

        console.log(this.position.pointerX, root.getBoundingClientRect().y)

        this.cursorStyle.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`
        this.rotate(this.position)
        this.moving ? this.stop() : this.moving = true
      },
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees

        if (isNaN(unsortedAngle)) {
          this.angle = this.previousAngle
        } else {
          if (unsortedAngle <= 45) {
            if (position.distanceX * position.distanceY >= 0) {
              this.angle = +unsortedAngle
            } else {
              this.angle = -unsortedAngle
            }
            this.motionBlur.setAttribute('stdDeviation', \`\${Math.abs(this.position.distanceX / 2)}, 0\`)
          } else {
            if (position.distanceX * position.distanceY <= 0) {
              this.angle = 180 - unsortedAngle
            } else {
              this.angle = unsortedAngle
            }
            this.motionBlur.setAttribute('stdDeviation', \`\${Math.abs(this.position.distanceY / 2)}, 0\`)
          }
        }
        this.cursorStyle.transform += \` rotate(${this.angle}deg)\`
        this.previousAngle = this.angle
      },
      stop() {
        setTimeout(() => {
          this.motionBlur.setAttribute('stdDeviation', '0, 0')
          this.moving = false
        }, 50)
      }
    }
  }
<\/script>

<style scoped>
.curzr {
  --size:  ${25 + (this.cursorsConfig.size / 5)}px;
  --delay: ${this.cursorsConfig.delay / 10}ms;

  box-sizing: border-box;
  position: fixed;
  top: calc(var(--size) / -2);
  left: calc(var(--size) / -2);
  z-index: 2147483647;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: visible;
  transition: 500ms, transform var(--delay);
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