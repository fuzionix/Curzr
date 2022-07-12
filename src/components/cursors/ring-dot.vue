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
        this.cursorStyle.top = (getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2) / -2) + 'px' 
        this.cursorStyle.left = (getComputedStyle(this.$refs.cursor).getPropertyValue('--size').slice(0, -2) / -2) + 'px'
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
        event.target.localName === 'button' || event.target.localName === 'a' || event.target.parentElement.localName === 'button' 
          ? this.hover(40) 
          : this.hoverout()

        this.pointerX = event.pageX - cursorBlock.getBoundingClientRect().x
        this.pointerY = event.pageY - cursorBlock.getBoundingClientRect().y + this.$root.$el.getBoundingClientRect().y

        this.cursorStyle.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
      },
      /**
       * Apply the transform property when triggered by the 'mousemove' event listener
       */
      hover(radius) {
        this.cursorStyle.width = this.cursorStyle.height = `${radius}px`
        this.cursorStyle.top = this.cursorStyle.left = `${radius / -2}px`
      },
      /**
       * Apply the transform property when triggered by the 'mouseleave' event listener
       */
      hoverout() {
        this.cursorStyle.width = this.cursorStyle.height = `${this.cursorSize}px`
        this.cursorStyle.top = this.cursorStyle.left = `${this.cursorSize / -2}px`
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
        this.cursorStyle.width = ''
        this.cursorStyle.height = ''
        this.cursorStyle.transform = ''
        this.cursorStyle.transition = '500ms'
        this.$parent.$el.removeEventListener('click', this.click)
      }
    }
  }
</script>

<style lang="scss" scoped>
.curzr-ring-dot {
  --size:  20px;
  --delay: 100ms;
  --body-color: #111920;
  --outline-color: #F2F5F8;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--size);
  height: var(--size);
  transition: 200ms, transform var(--delay);
  background-color: #fff0;
  box-shadow: 0 0 0 1.25px var(--body-color), 0 0 0 2.25px var(--outline-color);
  border-radius: 50%;
  user-select: none;
  pointer-events: none;

  .curzr-dot {
    width: 4px;
    height: 4px;
    background-color: var(--body-color);
    box-shadow: 0 0 0 1px var(--outline-color);
    border-radius: 50%;
    user-select: none;
    pointer-events: none;
  }
}
</style>