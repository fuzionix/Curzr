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
  width: 110px;
  height: 50px;
  padding: .875rem 1rem .5rem;
  border: none;
  font-size: .875rem;
  color: #fff;
  letter-spacing: .5px;
  border-radius: 6px;
  background-color: $--theme-color;
  background: url('../../assets/button-background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  transition: 250ms;

  &:hover {
    filter: hue-rotate(20deg);
  }
}
</style>