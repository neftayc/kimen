<template>
  <!-- These are the custom components we'll create -->
  <!-- Values for `my-box` are percentages of the width of the canvas. -->
  <!-- Each bar will take up an equal space of the canvas. -->
  <my-canvas>
    <my-box
      v-for="(obj, index) of chartValues"
      :key="index"
      :x1="((index / chartValues.length) * 100)"
      :x2="(index / chartValues.length) * 100 + 100 / chartValues.length"
      :y1="100"
      :y2="100 - obj.val"
      :color="obj.color"
      :value="obj.val"
    >
    </my-box>
  </my-canvas>
</template>

<script>
import MyCanvas from './canva.vue'
import MyBox from './caja.vue'

export default {
  name: 'App',
  components: {
    MyCanvas,
    MyBox
  },

  data() {
    return {
      chartValues: [
        { val: 24, color: '#007cd6' },
        { val: 32, color: '#007cd6' },
        { val: 66, color: '#007cd6' },
        { val: 10, color: '#007cd6' },
        { val: 28, color: '#007cd6' },
        { val: 60, color: '#007cd6' }
      ]
    }
  }
}
</script>

<style></style>
