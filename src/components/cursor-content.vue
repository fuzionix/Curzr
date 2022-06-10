<template>
  <section id="cursor-content" class="cursor-content cursor-content-grid">
    <cursor-block 
      v-for="(cursorData, index) in cursorsData" 
      @changeModelStatus="changeModelStatus" 
      :cursor-data="cursorData"
      :key="index">
    </cursor-block>
    <transition name="fade">
      <keep-alive>
        <cursor-model 
          v-if="modelStatus" 
          @changeModelStatus="changeModelStatus"
          @changeModel="changeModel"
          :model="model"
          >
        </cursor-model>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import CursorBlock from '@/components/cursor-block.vue'
  import CursorModel from '@/components/cursor-model.vue'

  export default {
    name: 'CursorContent',
    components: {
      'cursor-block': CursorBlock,
      'cursor-model': CursorModel
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
        modelStatus: false,
        model: 'cursor-model-viewcode'
      }
    },
    methods: {
      changeModelStatus(data) {
        this.modelStatus = data.modelStatus
        this.model = data.model
      },
      changeModel(model) {
        this.model = model
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