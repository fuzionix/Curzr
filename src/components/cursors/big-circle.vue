<template>
  <div id="big-circle" class="big-circle" ref="cursor">
    <div class="circle" ref="circle"></div>
    <div class="dot" ref="dot"></div>
  </div>
</template>

<script>
  export default {
    name: 'BigCircle',
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
      }
    },
    computed: {
      /**
       * The cursor size from the CSS variable
       */
      cursorSize() {
        return Number(getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2))
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
          this.cursorStyle.setProperty('--size', (this.cursorSize + (configValue.size * 3)) + 'px')
          this.cursorStyle.setProperty('--delay', configValue.delay + 'ms')
          if (this.cursorsConfig.from === 'model') {
            this.cursorStyle.setProperty('--filter-invert', `invert(${configValue.filterInvert})`)
          }
          !this.cursorsConfig.origin ? this.setOriginalCursor('none') : this.setOriginalCursor('')
        },
        deep: true
      }
    },
    methods: {
      /**
       * Center the position of cursors after theirs container loaded 
       */
      init() {
        this.initChild(this.$refs.cursor.childNodes)
        this.$parent.$el.addEventListener('click', this.click)
      },
      initChild(nodes) {
        nodes.forEach(node => {
          node.style.top = 0
          node.style.left = 0
          node.style.transition = ''
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
        this.$refs.circle.style.transform += ` scale(0.75)`
        setTimeout(() => {
          this.$refs.circle.style.transform = this.$refs.circle.style.transform.replace(` scale(0.75)`, '')
        }, 35)
      },
      setOriginalCursor(value) {
        this.$refs.cursor.parentElement.style.cursor = value
        this.$refs.cursor.parentElement.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
          el.style.cursor = 'inherit'
        })
      },
      /**
       * Center the position of cursors when leaving theirs container
       */
      reset() {
        this.resetChild(this.$refs.cursor.childNodes)
        this.$parent.$el.removeEventListener('click', this.click)
      },
      resetChild(nodes) {
        nodes.forEach(node => {
          node.style.top = ''
          node.style.left = ''
          node.style.transform = ''
          node.style.transition = '500ms'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.big-circle {
  --size: 100px;
  --delay: 100ms;
  --filter-invert: invert(1);

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--size);
    height: var(--size);
    background-color: #fff0;
    border-radius: 50%;
    transition: 500ms, transform var(--delay);
    user-select: none;
    pointer-events: none;
  }

  .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background-color: #fffd;
    border-radius: 50%;
    user-select: none;
    pointer-events: none;
    transition: 250ms, transform calc(var(--delay) * 0.75);
  }

  @supports (backdrop-filter: invert(1) grayscale(1)) {
    .circle {
      background-color: #fff0;
      backdrop-filter: var(--filter-invert) grayscale(1);
    }
  }

  @supports not (backdrop-filter: invert(1) grayscale(1)) {
    .circle {
      background-color: #000;
      opacity: .5;
    }
  }
}
</style>