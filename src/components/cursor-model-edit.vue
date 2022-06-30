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
    <small>Cursor Size</small>
    <range-bar
      id="edit-range-size"
      class="range-bar"
      :range-value="0"
      :minmax="[-25, 25]"
    />
  </section>
</template>

<script>
  // import { Sketch } from 'vue-color'

  import NormalButton from '@/components/elements/normal-button.vue'
  import RangeBar from '@/components/elements/range-bar.vue'

  export default {
    name: 'CursorModelEdit',
    components: {
      // 'sketch-color-picker': Sketch,
      'normal-button': NormalButton,
      'range-bar': RangeBar
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
        this.$emit('changeModel', 'cursor-model-viewcode')
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../style/main.scss';

.cursor-model-edit {
  width: 300px;
  
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

  .title {
    margin-top: 1rem;
    letter-spacing: .5px;
    font-size: 1.5rem;
    font-variation-settings: 'wght' $--bold;
  }

  .range-bar {
    max-width: initial;
    margin: 1rem;
    margin-top: 1rem;
  }
}
</style>

<style lang="scss">
.block-content {
  .vc-sketch {
    border-radius: 12px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 8px 16px rgb(0 0 0 / 0%);

    .vc-sketch-saturation-wrap {
      border-radius: 6px;
    }
  }
}
</style>
