<template>
  <div id="badge" class="badge">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'badge-tag',
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

.badge {
  @include flex-center;
  position: relative;
  height: 24px;
  padding: 0 .625rem;
  font-size: .875rem;
  color: #fff;
  background-color: #1ae287;
  border-radius: 4px;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 1;
    width: 4px;
    height: 4px;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 2px;
    z-index: -1;
    width: 17px;
    height: 17px;
    transform: translate(50%, -50%) rotate(45deg);
    background-color: #1ae287;
    border-radius: 4px;
  }
}
</style>