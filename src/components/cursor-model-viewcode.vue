<template>
  <section id="cursor-model-viewcode" class="cursor-model-viewcode">
    <normal-button class="normal-btn">
      <small>Edit Cursor</small>
      <img src="../assets/icon/arrow.svg" alt="edit cursor" width="10">
    </normal-button>
    <div class="cursor-type">
      <badge-tag>FREE</badge-tag>
    </div>
    <h5 class="cursor-name">Normal Cursor</h5>
    <div class="cursor-features">
      <normal-tag class="tag">Mulitple</normal-tag>
      <normal-tag class="tag">Click</normal-tag>
      <normal-tag class="tag">Hover</normal-tag>
    </div>
    <div class="code-block-container">
      <component :is="codeblock"></component>
    </div>
  </section>
</template>

<script>
  import viewcodeJs from '@/components/cursor-model-js.vue'
  import viewcodeVue from '@/components/cursor-model-vue.vue'

  import badge from '@/components/elements/badge.vue'
  import tag from '@/components/elements/tag.vue'
  import button from '@/components/elements/normal-button.vue'

  export default {
    name: 'cursor-model-viewcode',
    components: {
      'cursor-model-js': viewcodeJs,
      'cursor-model-vue': viewcodeVue,
      'badge-tag': badge,
      'normal-tag': tag,
      'normal-button': button,
    },
    data() {
      return {
        codeblock: 'cursor-model-vue'
      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-model-viewcode {
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
      margin-left: .5rem;
      transition: 100ms;
    }
  }

  .cursor-type {
    width: 3.75rem;
    margin-left: -.25rem;
  }

  .cursor-name {
    margin-top: 1rem;
    letter-spacing: .5px;
  }

  .cursor-features {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;

    .tag {
      margin-right: .5rem;
      margin-bottom: .5rem;
    }
  }

  .code-block-container {
    margin-top: 1rem;
  }
}
</style>
