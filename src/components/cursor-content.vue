<template>
  <section id="cursor-content" class="cursor-content cursor-content-grid">
    <cursor-block @changeModelStatus="changeModelStatus"></cursor-block>
    <cursor-block @changeModelStatus="changeModelStatus"></cursor-block>
    <cursor-block @changeModelStatus="changeModelStatus"></cursor-block>
    <cursor-block @changeModelStatus="changeModelStatus"></cursor-block>
    <cursor-block @changeModelStatus="changeModelStatus"></cursor-block>

    <main-model v-if="modelStatus" @changeModelStatus="changeModelStatus"></main-model>
  </section>
</template>

<script>
  import cursorBlock from '@/components/cursor-block.vue'
  import model from '@/components/main-model.vue'

  export default {
    name: 'cursor-content',
    components: {
      'cursor-block': cursorBlock,
      'main-model': model
    },
    data() {
      return {
        modelStatus: false
      }
    },
    methods: {
      changeModelStatus(status) {
        this.modelStatus = status
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
  min-height: calc(100vh - $--nav-height - $--nav-height - $--adjustbar-height);
  
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

@media only screen and (max-width: 768px) {
  .cursor-content-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (min-width: 2560px) {
  .cursor-content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>