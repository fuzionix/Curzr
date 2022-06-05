<template>
  <button id="copy-button" class="copy-button" @click="copyText()">
    <img src="../../assets/icon/copy-icon.svg" alt="copy icon" width="16">
    <span>Copy to clipboard</span>
  </button>
</template>

<script>
  export default {
    name: 'copy-button',
    components: {
    },
    props: {
      copiedText: {
        type: String,
        required: true
      }
    },
    data() {
      return {}
    },
    methods: {
      // Return Promise
      copyToClipboard(copiedText) {
        // Navigator Clipboard API Needs Secure Context (HTTPS)
        if (navigator.clipboard && window.isSecureContext) {
          // Navigator Clipboard API Method
          return navigator.clipboard.writeText(copiedText)
        } else {
          // Text Area Method
          let textArea = document.createElement("textarea")
          textArea.value = copiedText
          // Make The Textarea Out Of Viewport
          textArea.style.position = "fixed"
          textArea.style.opacity = 0
          document.body.appendChild(textArea)
          textArea.select()
          return new Promise((res, rej) => {
            // Here The Magic Happens
            document.execCommand('copy') ? res() : rej()
            textArea.remove()
          });
        }
      },
      copyText() {
        this.copyToClipboard(this.copiedText).then(() => {
        }).catch(() => {
          console.error('Failed to copy to clipboard!')
        })
      }
    }
  }
</script>

<style lang="scss">
@import '../../style/main.scss';

.copy-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  height: 50px;
  border: 2px solid #fff2;
  border-radius: $--common-radius / 2;
  background-color: #fff0;
  box-shadow: 0 16px 40px #0004;
  backdrop-filter: blur(5px);
  transition: 250ms;

  &:hover {
    background-color: #fff1;
  }

  img {
    width: 16px;
    margin-right: 1rem;
    margin-top: 2px;
  }

  span {
    color: #fff0;
    background: linear-gradient(90deg, #fff 0%, #fffa 100%);
    background-clip: text;
    text-fill-color: transparent;
  }
}
</style>