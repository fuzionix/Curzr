<template>
  <div id="switch-button" class="switch-button">
    <label class="checkbox-item">
      <input type="checkbox" v-model="checked">
      <span class="checkbox-switch"></span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'SwitchButton',
    props: {
      isChecked: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        checked: this.isChecked
      }
    },
    watch: {
      checked: {
        handler() {
          /**
           * Emit the value to the parent
           */
          this.$emit('changeCheckedValue', this.checked)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

.switch-button {
  --switch-width: 48px;
  --switch-height: 24px;
  --switch-gap: 2px;

  .checkbox-item {
    position: relative;

    input[type="checkbox"] {
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      width: var(--switch-width);
      height: var(--switch-height);
      border-radius: 6px;
      background: darken($--section-line-color, 10%);
      margin: 0;
      transition: 250ms;

      &:checked {
        background: $--theme-color;
      }

      &:checked ~ .checkbox-switch {
        left: calc(var(--switch-height) + var(--switch-gap));
      }
    }

    .checkbox-switch {
      position: absolute;
      width: calc(var(--switch-height) - var(--switch-gap) * 2);
      height: calc(var(--switch-height) - var(--switch-gap) * 2);
      top: var(--switch-gap);
      left: var(--switch-gap);
      border-radius: 4px;
      background-color: #fff;
      transition: 250ms;
    }
  }
}
</style>