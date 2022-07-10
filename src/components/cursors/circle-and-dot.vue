<template>
  <div class="curzr-circle-and-dot" ref="cursor"></div>
</template>

<script>
  export default {
    name: 'CircleAndDot',
    props: {
      cursorsConfig: {
        type: Object
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
        fading: false
      }
    },
    computed: {
      /**
       * The cursor size from the CSS variable
       */
      cursorSize() {
        return Number(getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2))
      },
      cursorStyle() {
        return this.$refs.cursor.style
      }
    },
    mounted() {
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
          this.cursorStyle.setProperty('--cursor-size', (this.cursorSize + (configValue.size / 5)) + 'px')
          this.cursorStyle.setProperty('--cursor-delay', configValue.delay + 'ms')
          !this.cursorsConfig.origin ? this.setOriginalCursor('none') : this.setOriginalCursor('')
        },
        deep: true,
        immeditate: true
      }
    },
    methods: {
      /**
       * Center the position of cursor after its container loaded 
       */
      init() {
        this.cursorStyle.top = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2) / -2) + 'px'
        this.cursorStyle.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2) / -2) + 'px'
        this.cursorStyle.transition = ''
        this.$parent.$el.addEventListener('click', this.click)
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

        event.target.localName === 'button' || event.target.localName === 'a' || event.target.parentElement.localName === 'button' 
          ? this.hover() 
          : this.hoverout()

        this.cursorStyle.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`

        this.rotate(this.position)
        this.fade(this.distance)
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
      },
      /**
       * Apply the transform property when triggered by the 'mousemove' event listener
       */
      hover() {
        this.cursorStyle.border = '15px solid #34dcff'
      },
      /**
       * Apply the transform property when triggered by the 'mouseleave' event listener
       */
      hoverout() {
        this.cursorStyle.border = '20px solid #34dcff'
      },
      /**
       * Shift the shadow which is the dot around the circle according to the distance 
       * between current position and previous position
       * then fade out the dot out of certain amount of time
       * 
       * @param {number} distance
       */
      fade(distance) {
        this.cursorStyle.boxShadow = `0 ${-35 - distance * 2}px 0 -20px #34dcff`
        if (!this.fading) {
          this.fading = true
          setTimeout(() => {
            this.cursorStyle.boxShadow = '0 -35px 0 -20px #34dcff00'
            this.fading = false
          }, 50)
        }
      },
      /**
       * Apply the transform property when triggered by the 'click' event listener
       */
      click() {
        this.cursorStyle.transform += ` scale(0.75)`
        setTimeout(() => {
          this.cursorStyle.transform = this.cursorStyle.transform.replace(` scale(0.75)`, '')
        }, 35)
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
        this.cursorStyle.top = ''
        this.cursorStyle.left = ''
        this.cursorStyle.transform = ''
        this.cursorStyle.transition = '500ms'
        this.$parent.$el.removeEventListener('click', this.click)
      }
    }
  }
</script>

<style lang="scss" scoped>
.curzr-circle-and-dot {
  --cursor-size:  50px;
  --cursor-delay: 100ms;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--cursor-size);
  height: var(--cursor-size);
  background-color: #fff0;
  border: 20px solid #34dcff;
  border-radius: 50%;
  box-shadow: 0 -35px 0 -20px #34dcff00;
  transition: 250ms, transform var(--cursor-delay);
  user-select: none;
  pointer-events: none;
}
</style>