<template>
  <section id="cursor-content" class="cursor-content cursor-content-grid">
    <cursor-block></cursor-block>
    <cursor-block></cursor-block>
    <cursor-block></cursor-block>
    <cursor-block></cursor-block>
    <cursor-block></cursor-block>
  </section>
</template>

<script>
  import cursorBlock from '@/components/cursor-block.vue'
  export default {
    name: 'cursor-content',
    components: {
      'cursor-block': cursorBlock
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-content {
  position: relative;
  display: grid;
  grid-auto-rows: 300px;
  min-height: 100vh;
  
  & > * {
    border-bottom: 1px dashed darken($--section-line-color, 5%);
  }
}

.cursor-content-grid {
  grid-template-columns: repeat(2, 1fr);

  & > *:nth-child(odd) {
    border-right: 1px dashed darken($--section-line-color, 5%);
  }
}

.cursor-content-list {
  grid-template-columns: repeat(1, 1fr);
}
</style>