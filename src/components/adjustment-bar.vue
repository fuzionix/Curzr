<template>
  <div id="adjustment-bar" class="adjustment-bar">
    <div class="adjustment-container">
      <div class="size-adjustment">

      </div>
      <div class="transition-adjustment">
        
      </div>
      <div class="grid-view-adjustment">
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'adjustment-bar',
    components: {
      
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.adjustment-bar {
  display: flex;
  height: $--adjustbar-height;
  background-color: #fff;
  border-bottom: 1px solid $--section-line-color;
}
</style>