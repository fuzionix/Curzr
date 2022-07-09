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
    name: 'CodeCircleAndDot',
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
<div class="curzr-circle-and-dot"></div>`
      },
      javascript() {
        return `
class CircleAndDot {
  constructor() {
    this.root = document.body
    this.circleDot = document.querySelector(".curzr-circle-and-dot")

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
    this.cursorSize = ${50 + (this.cursorsConfig.size / 5)}
    this.fading = false

    this.circleDotStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#fff0',
      border: '20px solid #34dcff',
      borderRadius: '50%',
      boxShadow: '0 -35px 0 -20px #34dcff00',
      transition: '250ms, transform ${this.cursorsConfig.delay}ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.circleDot, this.circleDotStyle)
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
    this.previousPointerX = this.position.pointerX
    this.previousPointerY = this.position.pointerY
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.position.distanceX = this.previousPointerX - this.position.pointerX
    this.position.distanceY = this.previousPointerY - this.position.pointerY
    this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    } else {
      this.hoverout()
    }


    this.circleDot.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

    this.rotate(this.position)
    this.fade(this.distance)
  }

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
    this.circleDot.style.transform += \` rotate(\${this.angleDisplace}deg)\`
  }

  hover() {
    this.circleDot.style.border = '15px solid #34dcff'
  }

  hoverout() {
    this.circleDot.style.border = '20px solid #34dcff'
  }

  fade(distance) {
    this.circleDot.style.boxShadow = \`0 \${-35 - distance}px 0 -20px #34dcff\`
    if (!this.fading) {
      this.fading = true
      setTimeout(() => {
        this.circleDot.style.boxShadow = '0 -35px 0 -20px #34dcff00'
        this.fading = false
      }, 50)
    }
  }

  click() {
    this.circleDot.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.circleDot.style.transform = this.circleDot.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  remove() {
    this.circleDot.remove()
  }
}

(() => {
  const cursor = new CircleAndDot()
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