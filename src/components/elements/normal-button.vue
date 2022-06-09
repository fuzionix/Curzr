<template>
  <button id="normal-button" class="normal-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'NormalButton',
    components: {
      
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

.normal-button {
  @include flex-center;
  padding: .875rem 2rem;
  border: none;
  font-size: .875rem;
  border-radius: 6px;
  transition: 250ms;
}

.button-primary {
  color: #fff;
  background-color: $--theme-color;
}

.button-outline {
  color: #8699ad;
  box-shadow: 0 0 0 1.5px darken($--section-line-color, 5%) inset;
}

.button-transparent {
  color: #8699ad;

  &:hover {
  }
}
</style>