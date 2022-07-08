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
      <div class="input-container">
        <small class="input-name">Size</small>
        <small class="input-description">Adjust the size of the cursor</small>
        <range-bar
          id="edit-size"
          class="range-bar"
          :range-value="cursorsConfig.size"
          :minmax="[-25, 25]"
          @changeRangeValue="changeRangeValue"
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
          @changeRangeValue="changeRangeValue"
        />
      </div>
      <div class="input-container">
        <small class="input-name">Original Cursor</small>
        <small class="input-description">Remain the default cursor</small>
        <switch-button class="switch-button" />
      </div>
      <hr>
      <div class="input-container">
        <small class="input-name">Color</small>
        <small class="input-description">Change the color of cursor body</small>
        <color-picker class="color-picker" />
      </div>
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

  export default {
    name: 'CursorModelEdit',
    components: {
      'color-picker': ColorPicker,
      'normal-button': NormalButton,
      'switch-button': SwitchButton,
      'range-bar': RangeBar,
    },
    props: {
      cursorsConfig: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        colors: '#194d33'
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
       */
      changeRangeValue(event) {
        this.$emit('changeRangeValue', event)
      },
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
