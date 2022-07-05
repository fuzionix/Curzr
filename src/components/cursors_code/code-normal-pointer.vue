<template>
  <code>
    {{ 
      language === 'html' 
        ? html 
        : language === 'javascript' 
          ? javascript 
          : vue 
    }}
  </code>
</template>

<script>
  /* eslint-disable no-useless-escape */
  export default {
    name: 'CodeNormalPointer',
    components: {
    },
    props: {
      language: {
        type: String,
        required: true,
        validator: function (value) {
          return [
            'html',
            'javascript',
            'vue'
          ].indexOf(value) !== -1
        }
      }
    },
    data() {
      return {
        html: 
        `
<div class="curzr-normal-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.79 42.83">
    <path d="M25.14,20.52L4.33,1.52C3.05,.36,1,1.27,1,2.99V31.17c0,1.72,2.04,2.63,3.32,1.47l3.23-2.93c1-.91,2.6-.57,3.15,.67l4,9.07c.89,2.02,3.25,2.94,5.27,2.05h0c2.02-.89,2.94-3.25,2.05-5.27l-4-9.07c-.55-1.24,.28-2.65,1.63-2.78l4.34-.41c1.72-.16,2.42-2.28,1.15-3.44Z" fill="#111920"/>
    <path d="M18.36,42.83c-1.92,0-3.76-1.11-4.58-2.98l-4-9.07c-.13-.29-.38-.5-.7-.57-.32-.07-.63,.02-.87,.23l-3.23,2.93c-.89,.81-2.12,1.01-3.21,.52-1.1-.49-1.78-1.53-1.78-2.73V2.99C0,1.79,.68,.74,1.78,.26,2.88-.22,4.11-.02,5,.79L25.81,19.79c.88,.81,1.2,2.02,.82,3.15-.38,1.14-1.36,1.91-2.55,2.02l-4.34,.41c-.32,.03-.59,.21-.76,.48-.16,.28-.18,.6-.05,.9l4,9.07c.54,1.22,.57,2.58,.09,3.83-.48,1.25-1.42,2.23-2.64,2.77-.65,.29-1.34,.42-2.01,.42Zm-9.5-14.64c.21,0,.42,.02,.63,.07,.95,.2,1.72,.83,2.11,1.72l4,9.07c.67,1.51,2.44,2.2,3.96,1.53,.73-.32,1.3-.91,1.59-1.66,.29-.75,.27-1.56-.05-2.3l-4-9.07c-.39-.89-.33-1.88,.16-2.72,.49-.84,1.33-1.37,2.29-1.46l4.34-.41c.59-.05,.79-.52,.84-.67s.17-.64-.27-1.04L3.65,2.26c-.44-.4-.93-.23-1.06-.17-.14,.06-.59,.31-.59,.9V31.17c0,.59,.45,.84,.58,.9,.14,.06,.62,.23,1.06-.17l3.23-2.93c.56-.51,1.26-.78,1.99-.78Z" fill="#f2f5f8"/>
  </svg>
</div>
        `,
        javascript:
        `
class NormalPointer {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr-normal-pointer")

    this.pointerX = 0,
    this.pointerY = 0,
    this.cursorSize = 15

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top:'0px',
      left: '0px',
      width: \`\${ this.cursorSize }px\`,
      transition: '250ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
  }

  move(event) {
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y

    if (event.target.localName === 'button' || 
        event.target.localName === 'a' || 
        event.target.onclick !== null ||
        event.target.className.includes('curzr-hover')) {
      this.hover()
    } else {
      this.hoverout()
    }

    this.cursor.style.transform = \`translate3d(\${this.pointerX}px, \${this.pointerY}px, 0)\`
  }

  hover() {
  }

  hoverout() {
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new NormalPointer()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.onmousemove = function (event) {
      cursor.move(event)
    }
  } else {
    cursor.remove()
  }
})()
        `,
        vue: 
        `
<template>
  <div ref="curzr" class="curzr-arrow-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#f2f5f8" />
      <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ArrowPointer',
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
        degrees: 57.296
      }
    },
    methods: {
      move(event) {
        this.previousPointerX = this.position.pointerX
        this.previousPointerY = this.position.pointerY
        this.position.pointerX = event.pageX + this.$root.$el.getBoundingClientRect().x
        this.position.pointerY = event.pageY + this.$root.$el.getBoundingClientRect().y
        this.position.distanceX = this.previousPointerX - this.position.pointerX
        this.position.distanceY = this.previousPointerY - this.position.pointerY

        this.$refs.curzr.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

        this.rotate(this.position)
      },
      rotate(position) {
        let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees
        this.previousAngle = this.angle

        if (position.distanceX <= 0 && position.distanceY >= 0) {
          this.angle = 90 - unsortedAngle + 0
        } else if (position.distanceX < 0 && position.distanceY < 0) {
          this.angle = unsortedAngle + 90
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
          this.angle = 90 - unsortedAngle + 180
        } else if (position.distanceX > 0 && position.distanceY > 0) {
          this.angle = unsortedAngle + 270
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
        this.$refs.curzr.style.transform += \` rotate(\${this.angleDisplace}deg)\`
      }
    }
  }
<\/script>

<style>
.curzr-arrow-pointer {
  --cursor-size:  20px;
  --cursor-delay: 100ms;

  position: fixed;
  top: 0;
  left: calc(var(--cursor-size) / -2);
  z-index: 2147483647;
  width: var(--cursor-size);
  height: var(--cursor-size);
  transition: 500ms, transform var(--cursor-delay);
  user-select: none;
  pointer-events: none;
}
</style>
        `
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

code {
  font-family: $--fonts-style-y;
}
</style>