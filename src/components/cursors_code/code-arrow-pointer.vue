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
    name: 'CodeArrowPointer',
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
<div class="curzr-arrow-pointer">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path class="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#f2f5f8" />
    <path class="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
  </svg>
</div>
        `,
        javascript:
        `
class ArrowPointer {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr-arrow-pointer")

    this.position = {
      distanceX: 0, 
      distanceY: 0,
      pointerX: 0,
      pointerY: 0,
    },
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.angle = 0
    this.previousAngle = 0
    this.angleDisplace = 0
    this.degrees = 57.296
    this.cursorSize = 20

    this.cursorStyle = {
      position: 'fixed',
      top: '0px',
      left: \`\${ -this.cursorSize / 2 }px\`,
      zIndex: '2147483647',
      width: \`\${ this.cursorSize }px\`,
      height: \`\${ this.cursorSize }px\`,
      transition: '500ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
  }

  move(event) {
    this.previousPointerX = this.position.pointerX
    this.previousPointerY = this.position.pointerY
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.position.distanceX = this.previousPointerX - this.position.pointerX
    this.position.distanceY = this.previousPointerY - this.position.pointerY
  
    this.cursor.style.transform = \`translate3d(\${this.position.pointerX}px, \${this.position.pointerY}px, 0)\`

    this.rotate(this.position)
  }

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
    this.cursor.style.transform += \` rotate(\${this.angleDisplace}deg)\`
  }
}

(() => {
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const cursor = new ArrowPointer()
    
    document.onmousemove = function (event) {
      cursor.move(event)
    }
  }
})()
        `,
        vue: 
        `
<template>
  <div id="big-circle" class="big-circle" ref="cursor">
    <div class="circle" ref="circle"></div>
    <small class="text" ref="text">MOVE</small>
  </div>
</template>

<script>
  export default {
    name: 'big-circle',
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
          this.trigger ? null : node.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0)\`
        })
      },
      hover() {
        this.trigger = true
        this.$refs.circle.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0) scale(1.5)\`
        this.$refs.text.style.transform = \`translate3d(calc(-50% + \${this.position.pointerX}px), calc(-50% + \${this.position.pointerY}px), 0)\`
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
<\/script>

<style lang="scss">
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