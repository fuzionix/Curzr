<template>
  <svg class="curzr-glitch-effect" ref="cursor">
    <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
      <feGaussianBlur ref="cursorMotionBlur" stdDeviation="10, 0"/>
    </filter>
    <circle cx="50%" cy="50%" r="12.5" fill="#282828" filter="url(#motionblur)" />
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
        moving: false
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
    watch: {
      /**
       * Change the value of the CSS variable after cursorsConfig changes
       * 
       * @param {object} configValue
       */
      cursorsConfig: {
        handler(configValue) {
          this.cursorStyle.setProperty('--cursor-size', (this.cursorSize + (configValue.size / 5)) + 'px')
          this.cursorStyle.setProperty('--cursor-delay', configValue.delay + 'ms')
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

        event.target.localName === 'button' || event.target.localName === 'a' || event.target.parentElement.localName === 'button' 
          ? this.hover() 
          : this.hoverout()

        this.cursorStyle.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`
        this.rotate(this.position)
        this.stop()
      },
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        this.previousAngle = this.angle

        this.angle = unsortedAngle

        if (isNaN(this.angle)) {
          this.angle = this.previousAngle
        } else {
          if (this.angle <= 45) {
            if (position.distanceX * position.distanceY >= 0) {
              this.cursorStyle.transform += ` rotate(${+this.angle}deg)`
            } else {
              this.cursorStyle.transform += ` rotate(${-this.angle}deg)`
            }
            this.$refs.cursorMotionBlur.setAttribute('stdDeviation', `${Math.abs(this.position.distanceX / 2)}, 0`)
          }
        }
        console.log(this.$refs.cursorMotionBlur)
      },
      /**
       * Apply the transform property when triggered by the 'mousemove' event listener
       */
      hover() {
      },
      /**
       * Apply the transform property when triggered by the 'mouseleave' event listener
       */
      hoverout() {
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
      stop() {
        if (!this.moving) {
          this.moving = true
          setTimeout(() => {
            this.$refs.cursorMotionBlur.setAttribute('stdDeviation', '0, 0')
            this.moving = false
          }, 50)
        }
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
  --cursor-size:  25px;
  --cursor-delay: 100ms;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-radius: 50%;
  overflow: visible;
  transition: 500ms, transform var(--cursor-delay);
  user-select: none;
  pointer-events: none;
}
</style>