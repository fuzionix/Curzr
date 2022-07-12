<template>
  <div id="arrow-pointer" class="arrow-pointer" ref="cursor">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ArrowPointer',
    props: {
      cursorsConfig: {
        type: Object,
        required: true
      }
    },
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
        cursorSizeInit: 0
      }
    },
    computed: {
      cursorStyle() {
        return this.$refs.cursor.style
      }
    },
    mounted() {
      /**
       * The cursor size from the CSS variable
       */
      this.cursorSizeInit = this.cursorSize = Number(getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2))

      /**
       * The cursor status of the default cursor visibility
       */
      if (!this.cursorsConfig.origin) {
        this.setOriginalCursor('none')
      }
    },
    watch: {
      /**
       * Change the value of cursor after cursorsConfig changed from model edit or adjustment bar
       * 
       * @param {object} configValue
       */
      cursorsConfig: {
        handler(configValue) {
          this.cursorStyle.setProperty('--size', (this.cursorSizeInit + (configValue.size / 5)) + 'px')
          this.cursorStyle.setProperty('--delay', configValue.delay + 'ms')
          if (this.cursorsConfig.from === 'model') {
            this.cursorStyle.setProperty('--body-color', configValue.bodyColor)
            this.cursorStyle.setProperty('--outline-color', configValue.outlineColor)
          }
          this.cursorSize = this.cursorSizeInit + (configValue.size / 5)
          !this.cursorsConfig.origin ? this.setOriginalCursor('none') : this.setOriginalCursor('')
        },
        deep: true
      }
    },
    methods: {
      /**
       * Center the position of cursor after its container loaded 
       */
      init() {
        this.cursorStyle.top = 0 
        this.cursorStyle.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2) / -2) + 'px'
        this.cursorStyle.transition = ''
      },
      /**
       * Get the cursor position by event and apply them to the transform property of the cursor 
       * 
       * @param {object} event
       * @param {object} cursorBlock
       */
      move(event, cursorBlock) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.position.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY
        this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2)

        this.cursorStyle.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

        if (this.distance > 1) {
          this.rotate(this.position)
        } else {
          this.cursorStyle.transform += ` rotate(${this.angleDisplace}deg)`
        }
      },
      /**
       * Get the calculated distance between previous point and current point from the @param {object} position.
       * Calculate the angle using Inverse trigonometric functions and then apply it to the transform property of the cursor 
       * 
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan}
       * @see {@link https://en.wikipedia.org/wiki/Inverse_trigonometric_functions}
       * @param {object} position
       */
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        let modAngle
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
        this.cursorStyle.transform += ` rotate(${this.angleDisplace}deg)`

        setTimeout(() => {
          modAngle = this.angleDisplace >= 0 ? this.angleDisplace % 360 : 360 + this.angleDisplace % 360
          if (modAngle >= 45 && modAngle < 135) {
            this.cursorStyle.left = `${ -this.cursorSize }px`
            this.cursorStyle.top = `${ -this.cursorSize / 2 }px`
            console.log(modAngle)
          } else if (modAngle >= 135 && modAngle < 225) {
            this.cursorStyle.left = `${ -this.cursorSize / 2 }px`
            this.cursorStyle.top = `${ -this.cursorSize }px`
          } else if (modAngle >= 225 && modAngle < 315) {
            this.cursorStyle.left = '0px'
            this.cursorStyle.top = `${ -this.cursorSize / 2 }px`
          } else {
            this.cursorStyle.left = `${ -this.cursorSize / 2 }px`
            this.cursorStyle.top = '0px'
          }
        }, 0)
      },
      setOriginalCursor(value) {
        this.$refs.cursor.parentElement.style.cursor = value
        this.$refs.cursor.parentElement.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
          el.style.cursor = 'inherit'
        })
      },
      /**
       * Center the position of cursor when leaving its container
       */
      reset() {
        this.$refs.cursor.style.top = ''
        this.$refs.cursor.style.left = ''
        this.$refs.cursor.style.transform = ''
        this.$refs.cursor.style.transition = '500ms'
      }
    }
  }
</script>

<style lang="scss" scoped>
.arrow-pointer {
  --size:  20px;
  --delay: 100ms;
  --body-color: #F2F5F8;
  --outline-color: #111920;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--size);
  height: var(--size);
  transition: 250ms, transform var(--delay);
  user-select: none;
  pointer-events: none;

  .inner {
    fill: var(--body-color);
  }

  .outer {
    fill: var(--outline-color);
  }
}
</style>