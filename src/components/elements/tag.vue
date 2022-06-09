<template>
  <div id="tag" class="tag">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'NormalTag',
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

.tag {
  @include flex-center;
  position: relative;
  height: 24px;
  padding: 0 .625rem;
  font-size: .75rem;
  color: #8699ad;
  background-color: #e0e5ea;
  border-radius: 24px;
  user-select: none;
}
</style>