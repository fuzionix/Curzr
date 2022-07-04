<template>
  <section 
    v-if="filteredCursorsData !== null && filteredCursorsData !== undefined && Object.keys(this.filteredCursorsData).length > 0"
    id="cursor-content" 
    class="cursor-content"
    :class="viewMode"
  >
    <cursor-block 
      v-for="(cursorData, index) in filteredCursorsData" 
      :key="index"
      :cursor-data="cursorData"
      :cursors-config="cursorsConfig"
      @changeModelStatus="changeModelStatus" >
    </cursor-block>
    <div class="cursor-block-coming-soon">
      <h2 class="title">Coming Soon</h2>
      <small>Or</small>
      <span>
        <router-link to="contribution">&gt; Contribute yours &lt;</router-link>
      </span>
    </div>
    <transition name="fade">
      <keep-alive>
        <cursor-model 
          v-if="modelStatus" 
          :model="model"
          :cursor-data="cursorData"
          :cursors-config="cursorsConfig"
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
      filteredCursorsData: {
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
        model: 'cursor-model-viewcode',
        cursorComponent: ''
      }
    },
    computed: {
      /**
       * The class name that controlled the grid template columns
       * 
       * @values cursor-content-grid, cursor-content-list
       */
      viewMode() {
        return this.$store.state.viewMode
      }
    },
    methods: {
      /**
       * Controll visibility and content of the model
       * 
       * @param {object} data
       * @event changeModelStatus
       */
      changeModelStatus(data) {
        this.modelStatus = data.modelStatus
        this.model = data.model
        this.cursorData = data.cursorData
      },
      /**
       * Controll content of the model
       * 
       * @param {string} model
       * @event changeModel
       * 
       * @values cursor-model-viewcode, cursor-model-edit
       */
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

.cursor-block-coming-soon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fcfcfc;
  background-image:  linear-gradient($--section-line-color 1px, transparent 1px), linear-gradient(to right, $--section-line-color 1px, #fcfcfc 1px);
  background-size: 20px 20px;
  background-position: center;

  .title {
    font-variation-settings: 'wght' $--bold;
    opacity: .15;
    user-select: none;
  }

  small {
    margin: 1rem 0;
    opacity: .25;
  }

  span {
    font-size: .875rem;
    opacity: .5;
    transition: 250ms;

    &:hover {
      opacity: .75;
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