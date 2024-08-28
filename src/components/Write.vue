<script setup lang="ts">
import { ref, watch } from "vue"

import { countDown, prev, t } from "../store"
import { Step } from "../types"

const text = ref("")

watch(countDown, () => {
  if (countDown.value === 0) {
    Dusk.actions.write(text.value)
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
      autofocus
      class="textarea"
      maxlength="76"
      rows="2"
    ></textarea>
    <div v-if="prev && prev.type === Step.DRAW" class="box">
      <svg
        class="svg disabled"
        viewBox="0 0 300 400"
        v-html="Object.values(prev.dump).join('')"
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
}
.svg {
  background-color: white;
  width: 100%;
}
.title {
  margin-bottom: 4vw;
  font-weight: bold;
  font-size: 6vw;
}
.textarea {
  width: 94vw;
  resize: none;
}
</style>
