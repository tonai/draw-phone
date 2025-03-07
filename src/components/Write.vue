<script setup lang="ts">
import { ref, watch } from "vue"

import {
  countDown,
  disabled,
  mode,
  playerRounds,
  prev,
  prevPlayerId,
  round,
  t,
} from "../store"
import { Mode, Step, WriteRound } from "../types"
import CheckMark from "./icon/CheckMark.vue"

const text = ref(
  (playerRounds.value?.[round.value]?.[prevPlayerId.value] as WriteRound)
    ?.text ?? ""
)
const error = ref(false)

function write(enabled: boolean = false) {
  if (enabled || text.value !== "") {
    error.value = false
    Rune.actions.write({ enabled, text: text.value })
  } else if (!enabled && text.value === "") {
    error.value = true
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault()
    if (text.value !== "") {
      error.value = false
      Rune.actions.write({ enabled: false, text: text.value })
    } else {
      error.value = true
    }
  }
}

watch(countDown, () => {
  if (countDown.value === 0) {
    Rune.actions.write({ enabled: false, text: text.value })
  }
})
</script>

<template>
  <div class="write">
    <div class="title">
      {{ prev ? t("Describe the scene") : `${t("Start a story")}...` }}
    </div>
    <form class="form" @submit.prevent="write(disabled)">
      <textarea
        v-model="text"
        :disabled="disabled"
        autofocus
        class="textarea"
        :class="{ blur: mode === Mode.SECRET }"
        maxlength="76"
        rows="2"
        @keydown="handleKeyDown"
      ></textarea>
      <div class="submit">
        <button
          class="button button-sm"
          :class="{ selected: disabled }"
          type="submit"
        >
          <CheckMark />
        </button>
        <p class="error" :class="{ visible: error }">
          {{ t("Write something") }}
        </p>
      </div>
    </form>
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
.form {
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
  word-break: break-all;
}
.blur {
  color: transparent;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.submit {
  display: flex;
  align-items: center;
  position: relative;
}
.error {
  margin: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  left: 100%;
  margin-left: 1vw;
  max-width: 40vw;
  font-weight: bold;
}
.error.visible {
  opacity: 1;
}
</style>
