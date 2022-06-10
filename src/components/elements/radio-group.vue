<template>
  <div id="radio-group" class="radio-group">
    <label v-for="(radioItem, index) in radioItems" class="radio-item" :key="index">
      <input 
        type="radio" 
        v-model="value"
        :name="groupName" 
        :value="radioItem"
        :checked="index === 0"
        @change="changeValue">
      <span class="item-name">{{ radioItem }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'RadioGroup',
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
        value: null
      }
    },
    methods: {
      changeValue() {
        this.$emit('changeValue', this.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';

.radio-group {

  .radio-item {
    position: relative;

    &:first-child .item-name {
      border-radius: 6px 0 0 6px;
    }

    &:last-child .item-name {
      border-radius: 0 6px 6px 0;
      border-right: 2px solid $--section-line-color;
    }

    input[type="radio"] {
      appearance: none;
      margin: 0;

      &:checked ~ .item-name {
        background: $--section-line-color;
        opacity: 1;
      }
    }

    .item-name {
      padding: .5rem 1rem;
      font-size: .875rem;
      color: $--fonts-color, 10%;
      border: 2px solid $--section-line-color;
      border-right: 0;
      transition: 250ms;
      opacity: .75;

      &:hover {
        background: transparentize($--section-line-color, 0.5);
      }
    }
  }
}
</style>