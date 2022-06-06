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
    <radio-group 
      class="content-type" 
      groupName="content-type"
      :radioItems="radioItems"
      @changeValue="changeCodeblock">
    </radio-group>
    <div class="code-block-container">
      <transition name="fade" mode="out-in" :duration="250">
        <component :is="codeblock"></component>
      </transition>
    </div>
  </section>
</template>

<script>
  import viewcodeJs from '@/components/cursor-model-js.vue'
  import viewcodeVue from '@/components/cursor-model-vue.vue'

  import badge from '@/components/elements/badge.vue'
  import button from '@/components/elements/normal-button.vue'
  import radioGroup from '@/components/elements/radio-group.vue'

  export default {
    name: 'cursor-model-viewcode',
    components: {
      'cursor-model-js': viewcodeJs,
      'cursor-model-vue': viewcodeVue,
      'badge-tag': badge,
      'normal-button': button,
      'radio-group': radioGroup,
    },
    data() {
      return {
        codeblock: 'cursor-model-js',
        radioItems: [
          'JavaScript', 'VUE 2'
        ],
      }
    },
    methods: {
      changeCodeblock(value) {
        switch(value) {
          case 'JavaScript':
            this.codeblock = 'cursor-model-js'
            break
          case 'VUE 2':
            this.codeblock = 'cursor-model-vue'
        }
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

  .content-type {
    margin: 1.5rem 0;
  }

  .code-block-container {
    margin-top: 1rem;
  }
}
</style>
