<template>
  <section id="filter-menu" class="filter-menu">
    <header>
      <h5 class="menu-title">Filter by features</h5>
      <small class="menu-subtitle"><span class="tags-count">8</span> tags discovered</small>
    </header>
    <main class="tag-list">
      <div v-for="tagName in tagList" :key="tagName" class="list-tag">{{ tagName }}</div>
    </main>
    <footer>
      <button>Clear All</button>
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'FilterMenu',
    components: {
      
    },
    data() {
      return {
        tagList: ['Rotate', 'Click', 'Hover', 'Step', 'Animation', 'Active', 'Focus', 'Loading']
      }
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';

.filter-menu {
  position: absolute;
  top: 36px;
  right: 0;
  z-index: 8;
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 200px;
  padding: 1rem;
  background-color: #fff;
  border-radius: $--common-radius;
  box-shadow: 0 16px 40px 0 $--section-line-color, 0 0 0 1px $--section-line-color;

  header {
    .menu-title {
      font-size: 1.125rem;
    }
    .menu-subtitle {
      font-size: .75rem;
      opacity: .6;
    }
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;

    .list-tag {
      padding: .25rem .75rem;
      margin: .25rem;
      font-size: .75rem;
      border-radius: 2rem;
      box-shadow: 0 0 0 1px $--section-line-color;
      transition: 250ms;
      user-select: none;

      &:hover {
        background-color: $--section-line-color;
      }
    }
  }

  footer {
    button {
      padding: .75rem 1rem;
      border: none;
      outline: none;
      border-radius: $--common-radius;
      background-color: $--section-line-color;
      font-size: .875rem;
      transition: 250ms;

      &:hover {
        background-color: darken($--section-line-color, 10%);
      }
    }
  }
}

</style>