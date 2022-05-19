<template>
  <div id="adjustment-bar" class="adjustment-bar">
    <div class="adjustment-container">
      <div class="size-adjustment">
        <img src="../assets/icon/Scale.svg" alt="size adjustment icon" width="20">
        <small>Resize</small>
        <range-bar 
          class="range-bar"
          :rangeValue="cursorConfig.size"
          :minmax="[0, 50]"
          :sliderWidth="120"
        >
        </range-bar>
      </div>
      <div class="transition-adjustment">
        <img src="../assets/icon/Pathfinder.svg" alt="size adjustment icon" width="20">
        <small>Delay</small>
        <range-bar 
          class="range-bar"
          :rangeValue="cursorConfig.delay"
          :minmax="[0, 1000]"
          :sliderWidth="120"
        >
        </range-bar>
      </div>
      <div class="grid-view-adjustment">
        <div class="wrapper wrapper-active">
          <img src="../assets/icon/Grid.svg" alt="size adjustment icon" width="20">
        </div>
        <div class="wrapper">
          <img src="../assets/icon/List.svg" alt="size adjustment icon" width="20">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rangebar from '@/components/elements/range-bar.vue'

  export default {
    name: 'adjustment-bar',
    components: {
      'range-bar': rangebar
    },
    props: {
      cursorConfig: {
        type: Object,
        required: true
      }
    },
    computed: {
      
    },
    methods: {
    }
  }
</script>

<style lang="scss">
@import '../style/main.scss';
.adjustment-bar {
  display: flex;
  height: $--adjustbar-height;
  background-color: #fff;
  border-bottom: 1px solid $--section-line-color;

  .adjustment-container {
    display: flex;

    & > * {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      height: 100%;

      img {
        width: 20px;
        opacity: .2;
      }

      small {
        opacity: .4;
        margin-left: 1rem;
      }
    }

    .grid-view-adjustment {

      .wrapper {
        @include flex-center;
        padding: .5rem;
        margin-left: .25rem;
        border-radius: 6px;
        img {
          transform: rotate(90deg);
        }
      }

      .wrapper-active {
        background-color: $--section-line-color;
      }
    }
  }
}
</style>