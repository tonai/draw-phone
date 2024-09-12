<script setup lang="ts">
import { ref, watch } from "vue"

import { countDown, disabled, prev, t } from "../store"
import { Step } from "../types"

const text = ref("")
function write(enabled: boolean = false) {
  Dusk.actions.write({ enabled, text: text.value })
}

watch(countDown, () => {
  if (countDown.value === 0) {
    write()
  }
})
</script>

<template>
  <div class="write">
    <div class="title">
      {{ prev ? t("Describe the scene") : `${t("Start a story")}...` }}
    </div>
    <textarea
      v-model="text"
      :disabled="disabled"
      autofocus
      class="textarea"
      maxlength="76"
      rows="2"
    ></textarea>
    <button
      class="button button-sm"
      :class="{ selected: disabled }"
      type="button"
      @click="write(disabled)"
    >
      ✓
    </button>
    <div class="box" :class="{ invisible: !(prev && prev.type === Step.DRAW) }">
      <svg
        class="svg disabled"
        viewBox="0 0 300 400"
        v-html="
          prev && prev.type === Step.DRAW
            ? Object.values(prev.dump).join('')
            : ''
        "
      ></svg>
    </div>
  </div>
</template>

<style scoped>
.write {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  margin-top: 4vw;
  width: 93vw;
}
.invisible {
  opacity: 0;
}
.svg {
  background-color: white;
  width: 100%;
}
.title {
  margin-bottom: 0.5vh;
  font-weight: bold;
  font-size: 6vw;
}
.textarea {
  width: 93vw;
  resize: none;
  border: 2px solid var(--border-color);
  background-color: white;
  border-radius: 2vw;
  padding: 2vw;
  margin-bottom: 0.5vh;
}
</style>
