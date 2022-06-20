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
  </section>
</template>

<script>
  import NormalButton from '@/components/elements/normal-button.vue'

  export default {
    name: 'CursorModelEdit',
    components: {
      'normal-button': NormalButton,
    },
    data() {
      return {
        
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
  }
}
</style>
