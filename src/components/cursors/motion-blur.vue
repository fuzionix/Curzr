<template>
  <svg class="curzr-glitch-effect" ref="cursor">
    <filter :id="`motionblur-${this._uid}`" x="-100%" y="-100%" width="400%" height="400%">
      <feGaussianBlur class="motion-blur" stdDeviation="0, 0"/>
    </filter>
    <circle cx="50%" cy="50%" :r="`${this.cursorSize}`" :fill="`${this.cursorsConfig.bodyColor || '#120d27'}`" :filter="`url(#motionblur-${this._uid})`" />
  </svg>
</template>

<script>
  export default {
    name: 'MotionBlur',
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
          pointerX: 0,
          pointerY: 0,
        },
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296,
        moving: false,

        cursorSize: 0,
        cursorSizeInit: 0
      }
    },
    computed: {
      cursorStyle() {
        return this.$refs.cursor.style
      },
      motionBlur() {
        return this.$refs.cursor.querySelector('.motion-blur')
      }
    },
    mounted() {
      /**
       * The cursor size from the CSS variable
       */
      this.cursorSizeInit = this.cursorSize = Number(getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2)) / 2

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
          this.cursorSize = this.cursorSizeInit + (configValue.size / 5)
          if (this.cursorsConfig.from === 'model') {
            this.cursorStyle.setProperty('--body-color', configValue.bodyColor)
          }
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
        this.cursorStyle.top = (getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2) / -2) + 'px'
        this.cursorStyle.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2) / -2) + 'px'
        this.cursorStyle.transition = ''
        this.$refs.cursor.addEventListener('click', this.click)
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
        this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20)
        this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20)

        this.cursorStyle.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
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
            this.motionBlur.setAttribute('stdDeviation', `${Math.abs(this.position.distanceX / 2)}, 0`)
          } else {
            if (position.distanceX * position.distanceY <= 0) {
              this.angle = 180 - unsortedAngle
            } else {
              this.angle = unsortedAngle
            }
            this.motionBlur.setAttribute('stdDeviation', `${Math.abs(this.position.distanceY / 2)}, 0`)
          }
        }
        this.cursorStyle.transform += ` rotate(${this.angle}deg)`
        this.previousAngle = this.angle
      },
      stop() {
        setTimeout(() => {
          this.motionBlur.setAttribute('stdDeviation', '0, 0')
          this.moving = false
        }, 50)
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
        this.$refs.cursor.removeEventListener('click', this.click)
      }
    }
  }
</script>

<style lang="scss" scoped>
.curzr-glitch-effect {
  --size:  20px;
  --delay: 20ms;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: visible;
  transition: 500ms, transform var(--delay);
  user-select: none;
  pointer-events: none;
}
</style>