<template>
  <div class="curzr-ring-dot" ref="cursor">
    <div class="curzr-dot"></div>
  </div>
</template>

<script>
  export default {
    name: 'RingDot',
    props: {
      cursorsConfig: {
        type: Object
      }
    },
    data() {
      return {
        pointerX: 0,
        pointerY: 0,
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
       * Center the position of cursor after its container loaded 
       */
      init() {
        this.$refs.cursor.style.top = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2) / -2) + 'px' 
        this.$refs.cursor.style.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--cursor-size').slice(0, -2) / -2) + 'px'
        this.$refs.cursor.style.transition = ''
      },
      /**
       * Get the cursor position by event and apply them to the transform property of the cursor 
       * 
       * @param {object} event
       * @param {object} cursorBlock
       */
      move(event, cursorBlock) {
        this.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

        event.target.localName === 'button' || event.target.localName === 'a' || event.target.parentElement.localName === 'button' 
          ? this.hover(40) 
          : this.hoverout()

        this.$refs.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
      },
      /**
       * Apply the transform property when triggered by the 'mousemove' event listener
       */
      hover(radius) {
        this.$refs.cursor.style.width = this.$refs.cursor.style.height = `${radius}px`
        this.$refs.cursor.style.top = this.$refs.cursor.style.left = `${radius / -2}px`
      },
      /**
       * Apply the transform property when triggered by the 'mouseleave' event listener
       */
      hoverout() {
        this.$refs.cursor.style.width = this.$refs.cursor.style.height = `${this.cursorSize}px`
        this.$refs.cursor.style.top = this.$refs.cursor.style.left = `${this.cursorSize / -2}px`
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
.curzr-ring-dot {
  --cursor-size:  20px;
  --cursor-delay: 100ms;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--cursor-size);
  height: var(--cursor-size);
  transition: 200ms, transform var(--cursor-delay);
  background-color: #fff0;
  box-shadow: 0 0 0 1.5px #282828, 0 0 0 2.5px #f8f8f8;
  border-radius: 50%;
  user-select: none;
  pointer-events: none;

  .curzr-dot {
    width: 4px;
    height: 4px;
    background-color: #282828;
    box-shadow: 0 0 0 1px #f8f8f8;
    border-radius: 50%;
    user-select: none;
    pointer-events: none;
  }
}
</style>