<template>
  <div id="big-circle" class="big-circle" ref="cursor">
    <div class="circle" ref="circle"></div>
    <small class="text" ref="text">MOVE</small>
  </div>
</template>

<script>
  export default {
    name: 'BigCircle',
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
        trigger: false
      }
    },
    mounted() {
      const buttons = this.$refs.cursor.parentElement.parentElement.querySelectorAll('.curzr-hover')
      buttons.forEach(button => {
        button.addEventListener('mousemove', () => {
          this.hover()
        })
      })
      buttons.forEach(button => {
        button.addEventListener('mouseleave', () => {
          this.hoverout()
        })
      })
    },
    methods: {
      init() {
        this.initChild(this.$refs.cursor.childNodes)
      },
      initChild(nodes) {
        nodes.forEach(node => {
          node.style.top = 0
          node.style.left = 0
        })
      },
      move(event, cursorBlock) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.position.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY

        this.moveChild(this.$refs.cursor.childNodes)
      },
      moveChild(nodes) {
        nodes.forEach(node => {
          this.trigger ? null : node.style.transform = `translate3d(calc(-50% + ${this.position.pointerX}px), calc(-50% + ${this.position.pointerY}px), 0)`
        })
      },
      hover() {
        this.trigger = true
        this.$refs.circle.style.transform = `translate3d(calc(-50% + ${this.position.pointerX}px), calc(-50% + ${this.position.pointerY}px), 0) scale(1.5)`
        this.$refs.text.style.transform = `translate3d(calc(-50% + ${this.position.pointerX}px), calc(-50% + ${this.position.pointerY}px), 0)`
        this.$refs.text.innerHTML = 'ENTER'
      },
      hoverout() {
        this.trigger = false
        this.$refs.text.innerHTML = 'MOVE'
      },
      reset() {
        this.resetChild(this.$refs.cursor.childNodes)
      },
      resetChild(nodes) {
        nodes.forEach(node => {
          node.style.top = ''
          node.style.left = ''
          node.style.transform = ''
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.big-circle {
  --cursor-size: 100px;
  --cursor-transform: 100ms;

  .circle {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    width: var(--cursor-size);
    height: var(--cursor-size);
    background-color: #fff0;
    border-radius: 50%;
    transition: 500ms, transform var(--cursor-transform);
    user-select: none;
    pointer-events: none;
    backdrop-filter: invert(1) grayscale(1);
  }

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: .875rem;
    color: #fff;
    letter-spacing: .25rem;
    text-indent: 0.25em;
    user-select: none;
    pointer-events: none;
    transition: 250ms, transform calc(var(--cursor-transform) * 0.75);
  }
}
</style>