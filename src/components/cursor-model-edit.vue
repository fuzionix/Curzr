<template>
  <section id="cursor-model-edit" class="cursor-model-edit">
    <normal-button 
      class="normal-btn" 
      @click.native="changeToViewcodeModel()"
    >
      <small>View Code</small>
      <img src="../assets/icon/arrow.svg" alt="view code arrow" width="10" height="10">
    </normal-button>
    <h5 class="title">Edit Cursor</h5>
    <div class="edit-container">
      <!-- 
        General Setting | Start

        All cursors will have these edit input fields
      -->
      <div class="input-container">
        <small class="input-name">Size</small>
        <small class="input-description">Adjust the size of the cursor</small>
        <range-bar
          id="edit-size"
          class="range-bar"
          :range-value="cursorsConfig.size"
          :minmax="[-25, 25]"
          @changeRangeValue="changeInputValue"
        />
      </div>
      <div class="input-container">
        <small class="input-name">Delay</small>
        <small class="input-description">Adjust the duration of the cursor from previous point to next point</small>
        <range-bar
          id="edit-delay"
          class="range-bar"
          :range-value="cursorsConfig.delay"
          :minmax="[0, 200]"
          @changeRangeValue="changeInputValue"
        />
      </div>
      <div class="input-container">
        <small class="input-name">Original Cursor</small>
        <small class="input-description">Remain the default cursor</small>
        <switch-button 
          id="edit-origin"
          class="switch-button" 
          :isChecked="cursorsConfig.origin" 
          @changeCheckedValue="changeInputValue"
        />
      </div>
      <!-- General Setting | End -->
      <hr>
      <!-- 
        Optional Setting | Start 

        The cursors will have the specified edit input fields according to the settingOption defined in 'cursors_data.json'
      -->
      <div 
        v-if="options.includes('bodyColor')"
        class="input-container"
      >
        <small class="input-name">Body Color</small>
        <small class="input-description">Change the color of cursor body</small>
        <color-picker 
          id="edit-body-color"
          class="color-picker" 
          style="z-index: 2" 
          :color="cursorsConfig.bodyColor"
          @changeColorValue="changeInputValue"
        />
      </div>
      <div 
        v-if="options.includes('outlineColor')"
        class="input-container"
      >
        <small class="input-name">Outline Color</small>
        <small class="input-description">Change the color of cursor outline</small>
        <color-picker 
          id="edit-outline-color"
          class="color-picker" 
          style="z-index: 1" 
          :color="cursorsConfig.outlineColor"
          @changeColorValue="changeInputValue"
        />
      </div>
      <div 
        v-if="options.includes('filterInvert')"
        class="input-container"
      >
        <small class="input-name">Filter Invert</small>
        <range-bar
          id="edit-filter-invert"
          class="range-bar"
          :range-value="cursorsConfig.filterInvert"
          :minmax="[0.75, 1]"
          :step="0.01"
          @changeRangeValue="changeInputValue"
        />
      </div>
      <!-- Optional Setting - End -->
      <normal-button 
        class="get-code-btn" 
        @click.native="changeToViewcodeModel()"
      >
        <small>GET THE CODE</small>
      </normal-button>
    </div>
  </section>
</template>

<script>
  import ColorPicker from '@/components/elements/color-picker.vue'

  import NormalButton from '@/components/elements/normal-button.vue'
  import SwitchButton from '@/components/elements/switch-button.vue'
  import RangeBar from '@/components/elements/range-bar.vue'

  import CursorsData from '@/json/cursors_data.json'

  export default {
    name: 'CursorModelEdit',
    components: {
      'color-picker': ColorPicker,
      'normal-button': NormalButton,
      'switch-button': SwitchButton,
      'range-bar': RangeBar,
    },
    props: {
      cursorData: {
        type: Object,
        required: true
      },
      cursorsConfig: {
        type: Object,
        required: true,
        validator: function (value) {
          return Object.keys(value).filter((key) => {
            return [
              'size', 
              'delay', 
              'origin',
              'bodyColor',
              'outlineColor',
              'filterInvert'
            ].indexOf(key) === -1
          }).length === 0
        }
      }
    },
    data() {
      return {
        cursorsData: CursorsData,
        colors: '#194d33'
      }
    },
    computed: {
      /**
       * Kebab case from componentName to camel case
       */
      cursorName() {
        return this.cursorData.componentName.replace(/-./g, x => x[1].toUpperCase())
      },
      options() {
        return Object.keys(this.cursorData.settingOption)
      }
    },
    methods: {
      /**
       * Emit the value to the parent
       * 
       * @event click
       */
      changeToViewcodeModel() {
        this.$store.commit('changeModelName', 'cursor-model-viewcode')
        this.$emit('changeModel', 'cursor-model-viewcode')
      },
      /**
       * Emit the value to the parent
       * 
       * @param {object} event
       * @event changeRangeValue
       * @event changeColorValue
       * @event changeCheckedValue
       */
      changeInputValue(event) {
        this.$emit('changeInputValue', event)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../style/main.scss';

.cursor-model-edit {
  
  .normal-btn {
    border: 1px solid $--section-line-color;
    margin-bottom: 1.5rem;

    &:hover {
      border: 1px solid darken($--section-line-color, 5%);

      img {
        margin-left: .75rem;
      }
    }

    img {
      width: 10px;
      height: auto;
      margin-left: .5rem;
      transition: 100ms;
    }
  }

  .get-code-btn {
    width: 100%;
    height: 60px;
    background-color: darken($--theme-color, 10%);

    small {
      color: #fff;
      letter-spacing: 1px;
    }

    &:hover {
      background-color: darken($--theme-color, 15%);
    }
  }

  .title {
    margin: 1rem 1rem 0;
    letter-spacing: .5px;
    font-size: 1.5rem;
    font-variation-settings: 'wght' $--bold;
  }

  .edit-container {
    padding: 1rem;

    .input-container {
      display: flex;
      flex-direction: column;
      
      .input-name { 
        opacity: .75;
      }

      .input-description { 
        margin-top: .5rem;
        opacity: .5;
        font-size: .75rem;
      }

      .range-bar {
        max-width: initial;
        margin: 1rem 0 2rem;
      }

      .color-picker {
        margin: 1rem 0 2rem;
      }

      .switch-button {
        margin: 1rem 0 2rem;
      }
    }

    hr {
      margin-bottom: 2rem;
      border: 0;
      border-top: 1px solid darken($--section-line-color, 5%);
    }
  }

  
}
</style>
