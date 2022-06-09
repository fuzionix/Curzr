<template>
  <div id="range-bar" class="range-bar">
    <input 
      :id="id"
      type="range" 
      :min="minmax[0]" 
      :max="minmax[1]" 
      v-model="sliderValue"
      ref="slider"
      @input="changeWidth(); emitValue($event)"
    >
  </div>
</template>

<script>
  export default {
    name: 'RangeBar',
    components: {
      
    },
    props: {
      id: {
        type: String,
        required: true
      },
      rangeValue: {
        type: Number,
        required: true
      },
      minmax: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sliderValue: this.rangeValue,
        filledWidth: 0
      }
    },
    mounted() {
      this.changeWidth()
    },
    computed: {
    },
    watch: {
    },
    methods: {
      changeWidth() {
        let sliderWidth = this.$refs.slider.clientWidth
        this.filledWidth = sliderWidth * (this.sliderValue - this.minmax[0]) / (this.minmax[1] - this.minmax[0])
        this.$refs.slider.style.setProperty('--filled-width', this.filledWidth + 'px')
      },
      emitValue(event) {
        this.$emit('changeRangeValue', { 
          value: event.target.value, 
          id: event.target.id 
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/main.scss';
.range-bar {
  display: flex;
  align-items: center;
  min-width: 100px;
  max-width: 200px;
  margin-left: 1.5rem;

  input[type="range"] {
    --filled-width: 60px;

    position: relative;
    -webkit-appearance: none;
    z-index: 1;
    width: 100%;
    height: 6px;
    margin: 0;
    background: $--section-line-color;
    outline: none;
    border-radius: 6px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: var(--filled-width);
      height: 6px;
      color: #ffffff00;
      background: $--theme-color;
      border-radius: 6px;
    }

    &::-webkit-slider-thumb {
      position: relative;
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #fff;
      border: 2px solid darken($--section-line-color, 5%);
      border-radius: 6px;
      z-index: 2;
      transition: 100ms;

      &:hover {
        width: 22px;
        height: 22px;
      }

    }

    &::-moz-range-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
    }
  }
}
</style>