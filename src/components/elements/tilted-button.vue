<template>
  <button id="tilted-button" class="tilted-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'tilted-button',
    components: {
      
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
@import '../../style/main.scss';

.tilted-button {
  position: relative;
  padding: .875rem 1.25rem;
  border: none;
  font-size: .875rem;
  color: #fff;
  border-radius: 6px;
  background-color: $--theme-color;
}
</style>