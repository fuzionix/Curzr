<template>
  <button id="normal-button" class="normal-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'normal-button',
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

.normal-button {
  margin-top: .5rem;
  padding: .875rem 2rem;
  border: none;
  font-size: .875rem;
  color: #8699ad;
  border-radius: 6px;
  box-shadow: 0 0 0 1.5px darken($--section-line-color, 5%) inset;
}
</style>