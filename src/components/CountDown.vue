<script setup lang="ts">
import { computed } from "vue"

import { countDowns } from "../constants"
import { countDown, step } from "../store"
import { Step } from "../types"

const startColor = [0, 255, 0] // green
const endColor = [255, 0, 0] // red

const progress = computed(() =>
  step.value === Step.DRAW || step.value === Step.WRITE
    ? countDown.value / countDowns[step.value]
    : 1
)
const width = computed(() => `${Math.round(progress.value * 10000) / 100}%`)
const backgroundColor = computed(() => {
  const color = [
    Math.round(
      startColor[0] * progress.value + (1 - progress.value) * endColor[0]
    ),
    Math.round(
      startColor[1] * progress.value + (1 - progress.value) * endColor[1]
    ),
    Math.round(
      startColor[2] * progress.value + (1 - progress.value) * endColor[2]
    ),
  ]
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
})
</script>

<template>
  <div class="countdown">
    <div class="progress" :style="{ backgroundColor, width }"></div>
  </div>
</template>

<style scoped>
.countdown {
  height: 2vh;
  width: 90vw;
  display: flex;
  justify-content: flex-end;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 2vw;
  margin: 2vw auto;
  overflow: hidden;
}
.progress {
  transition: all linear 100ms;
}
</style>
