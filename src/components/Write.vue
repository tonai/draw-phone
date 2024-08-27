<script setup lang="ts">
import { ref, watch } from "vue"

import { countDown, prev } from "../store"
import { Step } from "../types";

const text = ref("")

watch(countDown, () => {
  if (countDown.value === 0) {
    Dusk.actions.write(text.value)
  }
})
</script>

<template>
  <div v-if="prev && prev.type === Step.DRAW">
    <svg
      class="svg disabled"
      viewBox="0 0 300 400"
      v-html="Object.values(prev.dump).join('')"
    ></svg>
  </div>
  <input v-model="text" />
</template>

<style scoped>
.svg {
  background-color: white;
  width: 100%;
}
</style>