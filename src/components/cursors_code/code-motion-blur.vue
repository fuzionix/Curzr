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
      }
    },
    data() {
      return {
        html: 
        `
<svg class="curzr-glitch-effect">
  <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
    <feGaussianBlur class="curzr-motion-blur" stdDeviation="0, 0"/>
  </filter>
  <circle cx="50%" cy="50%" r="10" fill="#120d27" filter="url(#motionblur)" />
</svg>
        `,
        javascript:
        `
class MotionBlur {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr-glitch-effect")
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
    this.cursorSize = 25
    this.moving = false

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      borderRadius: '50%',
      overflow: 'visible',
      transition: '200ms, transform 20ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
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
          this.angle = +90 - unsortedAngle + 90
        } else {
          this.angle = -90 + unsortedAngle + 90
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
})()
        `,
        vue: 
        `
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
</style>
        `
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