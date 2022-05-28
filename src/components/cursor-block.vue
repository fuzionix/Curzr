<template>
  <section 
    id="cursor-block" 
    class="cursor-block" 
    @mousemove="moveCursor($event)"
    @mouseenter="initCursor()"
    @mouseleave="resetCursor()"
    ref="cursorBlock">
    <header>
      <div class="cursor-type">
        <badge-tag>FREE</badge-tag>
      </div>
      <div class="cursor-features">
        <normal-tag class="tag">Rotate</normal-tag>
        <normal-tag class="tag">Click</normal-tag>
        <normal-tag class="tag">Hover</normal-tag>
        <normal-tag class="tag">Step</normal-tag>
      </div>
    </header>
    <main>
      <component :is="cursorName" ref="cursor"></component>
    </main>
    <footer>
      <div class="cursor-name">Normal Cursor</div>
      <div class="button-section">
        <normal-button class="normal-btn button-transparent">
          <img src="../assets/icon/Customization.svg" alt="" width="30">
          <small>Edit</small>
        </normal-button>
        <tilted-button class="tilted-btn" @click.native="openModel()">View Code</tilted-button>
      </div>
    </footer>
    <div class="block-mask">

    </div>
  </section>
</template>

<script>
  import badge from '@/components/elements/badge.vue'
  import tag from '@/components/elements/tag.vue'
  import normalBtn from '@/components/elements/normal-button.vue'
  import tiltedBtn from '@/components/elements/tilted-button.vue'

  import normalCursor from '@/components/cursors/normal-cursor.vue'

  export default {
    name: 'cursor-block',
    components: {
      'badge-tag': badge,
      'normal-tag': tag,
      'normal-button': normalBtn,
      'tilted-button': tiltedBtn,
      'normal-cursor': normalCursor
    },
    data() {
      return {
        cursorName: 'normal-cursor',
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
        this.$refs.cursor.$el.style.top = 0 
        this.$refs.cursor.$el.style.left = (getComputedStyle(this.$refs.cursor.$el).getPropertyValue('--cursor-size').slice(1, -2) / -2) + 'px'
      },
      moveCursor(event) {
        let distanceX, distanceY
        this.previousPointerX = this.pointerX
        this.previousPointerY = this.pointerY
        this.pointerX = event.pageX - this.$refs.cursorBlock.getBoundingClientRect().x
        this.pointerY = event.pageY - this.$refs.cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

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
        this.$refs.cursor.$el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${this.angleDisplace}deg)`
      },
      resetCursor() {
        this.$refs.cursor.$el.style.top = '50%'
        this.$refs.cursor.$el.style.left = '50%'
        this.$refs.cursor.$el.style.transform = 'translate(-50%, -50%)'
      },
      openModel() {
        this.$emit('changeModelStatus', true)
        console.log('open')
      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-block {
  --bg-color: #fff;
  --dot-color: #669098;
  --dot-size: 1px;
  --dot-space: 7.5px;
  
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: #fff;
  background: 
    linear-gradient(90deg, var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, 
    linear-gradient(var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, var(--dot-color);
  background-size: var(--dot-space) var(--dot-space);
  background-position: center;
  cursor: none;

  &:hover {
    cursor: none;
  }

  &:hover footer .cursor-name {
    opacity: 1;
  }

  &:hover footer .normal-btn {
    cursor: none;
  }

  &:hover footer .tilted-btn {
    cursor: none;
  }

  &:hover .block-mask {
    opacity: 0;
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: .5;
  }

  header {
    display: flex;
    justify-content: space-between;
    z-index: 4;
    padding: .75rem 1.5rem;

    .cursor-features {
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: wrap;

      .tag {
        margin-left: .5rem;
        margin-bottom: .5rem;
      }
    }
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 4;
    padding: .75rem 1.5rem;

    .cursor-name {
      transition: 500ms;
      opacity: 0;
    }

    .button-section {
      display: flex;
      align-items: flex-end;

      button:first-child {
        margin-right: .75rem;
      }

      .normal-btn {
        height: 44px;
        padding: .875rem 1.5rem;

        &:hover {
          filter: contrast(0);
        }

        img {
          width: 20px;
          margin-right: .5rem;
        }
      }
    }
  }

  .block-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    opacity: 1;
    transition: 250ms;
  }
}
</style>