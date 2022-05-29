<template>
  <div id="normal-cursor" class="normal-cursor" ref="cursor">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'normal-cursor',
    components: {
      
    },
    data() {
      return {
        pointerX: 0,
        pointerY: 0,
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296
      }
    },
    methods: {
      initCursor() {
        this.$refs.cursor.style.top = 0 
        this.$refs.cursor.style.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(1, -2) / -2) + 'px'
      },
      moveCursor(event, cursorBlock) {
        let distanceX, distanceY
        this.previousPointerX = this.pointerX
        this.previousPointerY = this.pointerY
        this.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

        distanceX = this.previousPointerX - this.pointerX
        distanceY = this.previousPointerY - this.pointerY

        if (distanceX <= 0 && distanceY >= 0) {
          this.setDisplacement(distanceX, distanceY, this.pointerX, this.pointerY, true, 0)
        } else if (distanceX < 0 && distanceY < 0) {
          this.setDisplacement(distanceX, distanceY, this.pointerX, this.pointerY, false, 90)
        } else if (distanceX >= 0 && distanceY <= 0) {
          this.setDisplacement(distanceX, distanceY, this.pointerX, this.pointerY, true, 180)
        } else if (distanceX > 0 && distanceY > 0) {
          this.setDisplacement(distanceX, distanceY, this.pointerX, this.pointerY, false, 270)
        }
      },
      setDisplacement(dx, dy, px, py, flip = false, dir = 0) {
        this.previousAngle = this.angle

        if (flip) {
          this.angle = 90 - Math.atan(Math.abs(dy) / Math.abs(dx)) * this.degrees + dir
        } else {
          this.angle = Math.atan(Math.abs(dy) / Math.abs(dx)) * this.degrees + dir
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
        this.$refs.cursor.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${this.angleDisplace}deg)`
      },
      resetCursor() {
        this.$refs.cursor.style.top = '50%'
        this.$refs.cursor.style.left = '50%'
        this.$refs.cursor.style.transform = 'translate(-50%, -50%)'
      }
    }
  }
</script>

<style lang="scss">
@import '../../style/main.scss';

.normal-cursor {
  --cursor-size: 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--cursor-size);
  height: var(--cursor-size);
  transition: 500ms, transform 100ms;
  user-select: none;
  pointer-events: none;

  .inner {
    fill: #f2f5f8;
  }

  .outer {
    fill: #111920;
  }
}
</style>