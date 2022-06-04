<template>
  <section id="cursor-content" class="cursor-content cursor-content-grid">
    <cursor-block 
      v-for="(cursorData, index) in cursorsData" 
      @changeModelStatus="changeModelStatus" 
      :cursorData="cursorData"
      :key="index">
    </cursor-block>
    <transition name="fade">
      <cursor-model v-if="modelStatus" @changeModelStatus="changeModelStatus"></cursor-model>
    </transition>
  </section>
</template>

<script>
  import cursorBlock from '@/components/cursor-block.vue'
  import model from '@/components/cursor-model.vue'

  export default {
    name: 'cursor-content',
    components: {
      'cursor-block': cursorBlock,
      'cursor-model': model
    },
    props: {
      cursorsData: {
        type: Object,
        required: true
      }
    },
    mounted() {
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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