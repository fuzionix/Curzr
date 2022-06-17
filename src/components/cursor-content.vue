<template>
  <section 
    v-if="cursorsData !== null && cursorsData !== undefined && Object.keys(this.cursorsData).length > 0"
    id="cursor-content" 
    class="cursor-content"
    :class="viewMode"
  >
    <cursor-block 
      v-for="(cursorData, index) in cursorsData" 
      :key="index"
      :cursor-data="cursorData"
      :cursors-config="cursorsConfig"
      @changeModelStatus="changeModelStatus" >
    </cursor-block>
    <transition name="fade">
      <keep-alive>
        <cursor-model 
          v-if="modelStatus" 
          :model="model"
          @changeModelStatus="changeModelStatus"
          @changeModel="changeModel"
          >
        </cursor-model>
      </keep-alive>
    </transition>
  </section>
  <section 
    v-else
    id="cursor-content" 
    class="cursor-content-empty"
  >
    <div class="empty-content-container">
      <img src="../assets/empty-illustration.svg" alt="empty illustration" width="200" height="200">
      <h6 class="title">Can't Find Any Cursor</h6>
    </div>
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
      },
      cursorsConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        modelStatus: false,
        model: 'cursor-model-viewcode'
      }
    },
    computed: {
      viewMode() {
        return this.$store.state.viewMode
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

.cursor-content-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: min(100vh, 600px);

  .empty-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 200px;
      height: auto;
    }

    .title {
      margin: 2rem 0;
      text-align: center;
      font-size: 1rem;
      letter-spacing: .5px;
      color: #0006;
    }
  }
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