<template>
  <div id="color-picker" class="color-picker">
    <div class="color-picker-container">
      <label>
        <div class="hash-symbol">
          <span>#</span>
        </div>
        <input type="text" maxlength="6">
      </label>
    </div>
    <div class="color-block">
      <sketch-color-picker v-model="colors" />
    </div>
  </div>
</template>

<script>
  import { Sketch } from 'vue-color'
  export default {
    name: 'ColorPicker',
    components: {
      'sketch-color-picker': Sketch
    },
    data() {
      return {
        colors: '#194d33'
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

.color-picker {
  display: flex;

  .color-picker-container {
    flex: 1;

    label {
      position: relative;
      display: flex;
      align-items: center;

      .hash-symbol {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 100%;
        border-radius: 6px;
        background-color: $--section-line-color;
        color: $--fonts-color;
      }

      input {
        height: 45px;
        width: 100%;
        border: 1px solid darken($--section-line-color, 5%);
        border-radius: 6px;
        padding: 0;
        padding-left: 60px;
        outline: 0px solid transparentize($--section-line-color, 0.5);
        font-size: .875rem;
        transition: 50ms;
        caret-color: #888;

        &:focus {
          outline: 4px solid transparentize($--section-line-color, 0.5);
        }
      }
    }
  }

  .color-block {
    position: relative;
    width: 45px;
    height: 45px;
    margin-left: .75rem;
    border-radius: 12px;
    background-color: $--theme-color;
    box-shadow: 0 0 0 4px #fff8 inset;
  }
}
</style>

<style lang="scss">
.color-picker {
  .vc-sketch {
    position: absolute;
    top: 45px;
    right: 0;
    border-radius: 12px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 8px 16px rgb(0 0 0 / 0%);

    .vc-sketch-saturation-wrap {
      border-radius: 6px;
    }
  }
}
</style>