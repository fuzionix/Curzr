<template>
  <section id="cursor-block" class="cursor-block">
    <header>
      <div class="cursor-type">
        <badge-tag>FREE</badge-tag>
      </div>
      <div class="cursor-features">cursor-features</div>
    </header>
    <main>
      body
    </main>
    <footer>
      <div class="cursor-name">Normal Cursor</div>
      <div class="button-section">
        <normal-button class="normal-btn">Edit</normal-button>
        <tilted-button class="tilted-btn">View Code</tilted-button>
      </div>
    </footer>
    <div class="block-mask">

    </div>
  </section>
</template>

<script>
  import badge from '@/components/elements/badge.vue'
  import normalBtn from '@/components/elements/normal-button.vue'
  import tiltedBtn from '@/components/elements/tilted-button.vue'

  export default {
    name: 'cursor-block',
    components: {
      'badge-tag': badge,
      'normal-button': normalBtn,
      'tilted-button': tiltedBtn,
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.cursor-block {
  --bg-color: #fff;
  --dot-color: #669098;
  --dot-size: 1px;
  --dot-space: 7.5px;
  
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  background-color: #fff;
  background: 
    linear-gradient(90deg, var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, 
    linear-gradient(var(--bg-color) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center, var(--dot-color);
  background-size: var(--dot-space) var(--dot-space);
  background-position: center;

  &:hover .block-mask {
    opacity: 0;
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: .5;
  }

  header {
    display: flex;
    justify-content: space-between;
    z-index: 4;
    padding: .75rem 1.5rem;
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 4;
    padding: .75rem 1.5rem;

    .button-section {
      display: flex;

      button:first-child {
        margin-right: .75rem;
      }
    }
  }

  .block-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    opacity: 1;
    transition: 250ms;
  }
}
</style>