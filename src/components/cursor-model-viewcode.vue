<template>
  <section id="cursor-model-viewcode" class="cursor-model-viewcode">
    <normal-button class="normal-btn" @click.native="changeToEditModel()">
      <small>Edit Cursor</small>
      <img src="../assets/icon/arrow.svg" alt="edit cursor arrow" width="10">
    </normal-button>
    <div class="cursor-type">
      <badge-tag>FREE</badge-tag>
    </div>
    <h5 class="cursor-name">Normal Cursor</h5>
    <radio-group 
      class="content-type" 
      groupName="content-type"
      :radio-items="radioItems"
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
  import CursorModelJs from '@/components/cursor-model-js.vue'
  import CursorModelVue from '@/components/cursor-model-vue.vue'

  import BadgeTag from '@/components/elements/badge.vue'
  import NormalButton from '@/components/elements/normal-button.vue'
  import RadioGroup from '@/components/elements/radio-group.vue'

  export default {
    name: 'CursorModelViewcode',
    components: {
      'cursor-model-js': CursorModelJs,
      'cursor-model-vue': CursorModelVue,
      'badge-tag': BadgeTag,
      'normal-button': NormalButton,
      'radio-group': RadioGroup,
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
      },
      changeToEditModel() {
        this.$emit('changeModel', 'cursor-model-edit')
      }
    }
  }
</script>

<style lang="scss" scoped>
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
