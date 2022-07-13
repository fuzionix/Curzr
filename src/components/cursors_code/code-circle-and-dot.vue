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
<div class="curzr" hidden></div>`
      },
      javascript() {
        return `
class CircleAndDot {
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
    this.fading = false

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: \`\${ this.cursorSize / -2 }px\`,
      left: \`\${ this.cursorSize / -2 }px\`,
      zIndex: '2147483647',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      backgroundColor: '#fff0',
      border: '1.25px solid ${this.cursorsConfig.bodyColor}',
      borderRadius: '50%',
      boxShadow: '0 -15px 0 -8px #0000',
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

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    } else {
      this.hoverout()
    }

    this.cursor.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

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
    this.cursor.style.transform += \` rotate(\${this.angleDisplace}deg)\`
  }

  hover() {
    this.cursor.style.border = '${(20 + (this.cursorsConfig.size / 5)) / 2}px solid ${this.cursorsConfig.bodyColor}'
  }

  hoverout() {
    this.cursor.style.border = '1.25px solid ${this.cursorsConfig.bodyColor}'
  }

  fade(distance) {
    this.cursor.style.boxShadow = \`0 \${-15 - distance}px 0 -8px ${this.cursorsConfig.bodyColor}, 0 0 0 1px #F2F5F8\`
    if (!this.fading) {
      this.fading = true
      setTimeout(() => {
        this.cursor.style.boxShadow = '0 -15px 0 -8px ${this.cursorsConfig.bodyColor}00, 0 0 0 1px #F2F5F8'
        this.fading = false
      }, 50)
    }
  }

  click() {
    this.cursor.style.transform += \` scale(0.75)\`
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(\` scale(0.75)\`, '')
    }, 35)
  }

  remove() {
    this.cursor.remove()
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
  <div class="curzr" ref="curzr" hidden></div>
</template>

<script>
  export default {
    name: 'CircleAndDot',
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
        fading: false,
        cursorSize: 0,
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

        if (event.target.localName === 'button' || 
            event.target.localName === 'a' || 
            event.target.onclick !== null ||
            event.target.className.includes('curzr-hover')) {
          this.hover()
        } else {
          this.hoverout()
        }

        this.cursorStyle.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

        this.rotate(this.position)
        this.fade(this.distance)
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
        this.cursorStyle.transform += \` rotate(\${this.angleDisplace}deg)\`
      },
      hover() {
        this.cursorStyle.border = \`\${this.cursorSize / 2}px solid #111920\`
      },
      hoverout() {
        this.cursorStyle.border = ''
      },
      fade(distance) {
        this.cursorStyle.boxShadow = \`0 \${-15 - distance * 2}px 0 -8px #111920, 0 0 0 1px #F2F5F8\`
        if (!this.fading) {
          this.fading = true
          setTimeout(() => {
            this.cursorStyle.boxShadow = \`0 -15px 0 -8px #11192000, 0 0 0 1px #F2F5F8\`
            this.fading = false
          }, 50)
        }
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

<style>
.curzr {
  --size:  20px;
  --delay: 100ms;
  --body-color: #111920;

  box-sizing: border-box;
  position: fixed;
  top: calc(var(--size) / -2);
  left: calc(var(--size) / -2);
  z-index: 2147483647;
  width: var(--size);
  height: var(--size);
  background-color: #fff0;
  border: 1.25px solid var(--body-color);
  border-radius: 50%;
  box-shadow: 0 -15px 0 -8px #0000, 0 0 0 1px #F2F5F8;
  transition: 250ms, transform var(--delay);
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