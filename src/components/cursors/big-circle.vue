<template>
  <div id="big-circle" class="big-circle" ref="cursor">
    <div class="circle" ref="circle"></div>
    <small class="text" ref="text">MOVE</small>
  </div>
</template>

<script>
  export default {
    name: 'BigCircle',
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
          pointerX: 0,
          pointerY: 0,
        },
        previousPointerX: 0,
        previousPointerY: 0,
        angle: 0,
        previousAngle: 0,
        angleDisplace: 0,
        degrees: 57.296,
      }
    },
    computed: {
      /**
       * The cursor size from the CSS variable
       */
      cursorSize() {
        return Number(getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2))
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
          this.$refs.cursor.style.setProperty('--cursor-size', (this.cursorSize + (configValue.size / 5)) + 'px')
          this.$refs.cursor.style.setProperty('--cursor-delay', configValue.delay + 'ms')
        },
        deep: true,
        immeditate: true
      }
    },
    methods: {
      /**
       * Center the position of cursors after theirs container loaded 
       */
      init() {
        this.initChild(this.$refs.cursor.childNodes)
      },
      initChild(nodes) {
        nodes.forEach(node => {
          node.style.top = 0
          node.style.left = 0
        })
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

        this.moveChild(this.$refs.cursor.childNodes)

        event.target.localName === 'button' || event.target.localName === 'a' || event.target.parentElement.localName === 'button' 
          ? this.hover() 
          : this.hoverout()
      },
      moveChild(nodes) {
        nodes.forEach(node => {
          node.style.transform = `translate3d(calc(-50% + ${this.position.pointerX}px), calc(-50% + ${this.position.pointerY}px), 0)`
        })
      },
      /**
       * Apply the transform property when triggered by the 'mousemove' event listener
       */
      hover() {
        this.$refs.circle.style.transform += ` scale(1.5)`
        this.$refs.text.style.transform = `translate3d(calc(-50% + ${this.position.pointerX}px), calc(-50% + ${this.position.pointerY}px), 0)`
        this.$refs.text.innerHTML = 'ENTER'
      },
      /**
       * Apply the transform property when triggered by the 'mouseleave' event listener
       */
      hoverout() {
        this.$refs.text.innerHTML = 'MOVE'
      },
      /**
       * Center the position of cursors when leaving theirs container
       */
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
  --cursor-delay: 100ms;

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
    transition: 500ms, transform var(--cursor-delay);
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
    transition: 250ms, transform calc(var(--cursor-delay) * 0.75);
  }
}
</style>