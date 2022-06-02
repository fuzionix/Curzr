<template>
  <div id="radio-group" class="radio-group">
    <label v-for="(radioItem, index) in radioItems" class="radio-item" :key="index">
      <input type="radio" :name="groupName">
      <span class="item-name">{{ radioItem }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'radio-group',
    components: {
      
    },
    props: {
      radioItems: {
        type: Array,
        required: true
      },
      groupName: {
        type: String,
        required: false
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
@import '../../style/main.scss';

.radio-group {

  .radio-item {
    position: relative;

    &:first-child .item-name {
      border-radius: 6px 0 0 6px;
    }

    &:last-child .item-name {
      border-radius: 0 6px 6px 0;
      border-right: 2px solid $--theme-color-extralight;
    }

    input[type="radio"] {
      appearance: none;
      margin: 0;

      &:checked ~ .item-name {
        background: $--theme-color-extralight;
      }
    }

    .item-name {
      padding: .25rem .5rem;
      font-size: .875rem;
      color: darken($--theme-color, 15%);
      border: 2px solid $--theme-color-extralight;
      border-right: 0;
      transition: 250ms;

      &:hover {
        opacity: .75;
      }
    }
  }
}
</style>