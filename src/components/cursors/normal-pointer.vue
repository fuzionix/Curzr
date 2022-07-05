<template>
  <div class="curzr-normal-pointer" ref="cursor">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.79 42.83">
      <path d="M25.14,20.52L4.33,1.52C3.05,.36,1,1.27,1,2.99V31.17c0,1.72,2.04,2.63,3.32,1.47l3.23-2.93c1-.91,2.6-.57,3.15,.67l4,9.07c.89,2.02,3.25,2.94,5.27,2.05h0c2.02-.89,2.94-3.25,2.05-5.27l-4-9.07c-.55-1.24,.28-2.65,1.63-2.78l4.34-.41c1.72-.16,2.42-2.28,1.15-3.44Z" fill="#111920"/>
      <path d="M18.36,42.83c-1.92,0-3.76-1.11-4.58-2.98l-4-9.07c-.13-.29-.38-.5-.7-.57-.32-.07-.63,.02-.87,.23l-3.23,2.93c-.89,.81-2.12,1.01-3.21,.52-1.1-.49-1.78-1.53-1.78-2.73V2.99C0,1.79,.68,.74,1.78,.26,2.88-.22,4.11-.02,5,.79L25.81,19.79c.88,.81,1.2,2.02,.82,3.15-.38,1.14-1.36,1.91-2.55,2.02l-4.34,.41c-.32,.03-.59,.21-.76,.48-.16,.28-.18,.6-.05,.9l4,9.07c.54,1.22,.57,2.58,.09,3.83-.48,1.25-1.42,2.23-2.64,2.77-.65,.29-1.34,.42-2.01,.42Zm-9.5-14.64c.21,0,.42,.02,.63,.07,.95,.2,1.72,.83,2.11,1.72l4,9.07c.67,1.51,2.44,2.2,3.96,1.53,.73-.32,1.3-.91,1.59-1.66,.29-.75,.27-1.56-.05-2.3l-4-9.07c-.39-.89-.33-1.88,.16-2.72,.49-.84,1.33-1.37,2.29-1.46l4.34-.41c.59-.05,.79-.52,.84-.67s.17-.64-.27-1.04L3.65,2.26c-.44-.4-.93-.23-1.06-.17-.14,.06-.59,.31-.59,.9V31.17c0,.59,.45,.84,.58,.9,.14,.06,.62,.23,1.06-.17l3.23-2.93c.56-.51,1.26-.78,1.99-.78Z" fill="#f2f5f8"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'NormalPointer',
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
        this.$refs.cursor.style.top = 0 
        this.$refs.cursor.style.left = 0
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

        this.$refs.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
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
.curzr-normal-pointer {
  --cursor-size:  15px;
  --cursor-delay: 100ms;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: var(--cursor-size);
  height: var(--cursor-size);
  transition: 500ms, transform var(--cursor-delay);
  user-select: none;
  pointer-events: none;
}
</style>