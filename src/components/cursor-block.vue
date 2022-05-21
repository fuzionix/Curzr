<template>
  <section id="cursor-block" class="cursor-block">
    <header>
      <div class="cursor-type">cursor-type</div>
      <div class="cursor-features">cursor-features</div>
    </header>
    <main>
      body
    </main>
    <footer>
      footer
    </footer>
    <div class="block-mask">

    </div>
  </section>
</template>

<script>
  export default {
    name: 'cursor-block',
    components: {
      
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
    padding: .5rem 1.5rem;
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
    flex-direction: row-reverse;
    z-index: 4;
    padding: .5rem 1.5rem;
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