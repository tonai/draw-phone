<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { createDrauu } from "drauu"
import {
  activeBrush,
  activeColor,
  activeSize,
  canRedo,
  canUndo,
  countDown,
  disabled,
  drauu,
  isDrawing,
  mode,
  playerRounds,
  prev,
  prevPlayerId,
  round,
  svg,
  syncDraw,
  t,
} from "../store"
import { DrawRound, Mode, Step } from "../types"
import CheckMark from "./icon/CheckMark.vue"

const interval = ref<number>()

const text = computed(() => {
  if (mode.value === Mode.BG) {
    if (round.value === 0) {
      return t("First draw the background")
    } else if (round.value === 1) {
      return t("Draw the first frame")
    } else {
      return t("Draw the next frame")
    }
  } else if (prev.value && prev.value.type === Step.WRITE) {
    return prev.value.text
  }
  return ""
})
const background = computed(() => {
  if (round.value === 0) {
    return null
  }
  let currentRound = round.value
  let playerRound = playerRounds.value[currentRound][prevPlayerId.value]
  while (currentRound > 0) {
    playerRound = playerRounds.value[currentRound - 1][playerRound.prev!]
    currentRound--
  }
  return (
    (playerRound.type === Step.DRAW &&
      Object.values(playerRound.dump).join("")) ||
    '<path fill="transparent" />'
  )
})

onMounted(() => {
  const brush = {
    arrowEnd: activeBrush.value === "arrow",
    mode: activeBrush.value === "arrow" ? "draw" : activeBrush.value,
    color: activeColor.value,
    size: activeSize.value,
  }
  const drauuInstance = createDrauu({
    el: svg.value,
    brush,
  })
  drauu.value = drauuInstance

  interval.value = setInterval(syncDraw, 1000)

  const dump = (
    playerRounds.value?.[round.value]?.[prevPlayerId.value] as DrawRound
  )?.dump
  if (dump) {
    drauuInstance.load(Object.values(dump).join(""))
  }
})

onUnmounted(() => {
  clearInterval(interval.value)
})

watch(countDown, () => {
  if (countDown.value === 0) {
    clearInterval(interval.value)
    syncDraw(true)
  }
})

function start() {
  isDrawing.value = true
  setTimeout(() => {
    // @ts-expect-error private access
    const currentNode = drauu.value?._currentNode
    if (currentNode) {
      currentNode.dataset.time = String(Date.now())
      currentNode.dataset.id = prevPlayerId.value
    }
  })
}

function end() {
  isDrawing.value = false
}

function updateState() {
  if (drauu.value) {
    canRedo.value = drauu.value.canRedo()
    canUndo.value = drauu.value.canUndo()
  }
}

onMounted(() => {
  if (drauu.value) {
    drauu.value.on("start", start)
    drauu.value.on("end", end)
    drauu.value.on("changed", updateState)
  }
})
</script>

<template>
  <div v-if="text" class="box">
    <div class="text">
      <span v-if="mode !== Mode.BG" class="dimmed">
        {{ t("It's time to draw:") }}&nbsp;
      </span>
      <strong>{{ text }}</strong>
    </div>
    <button
      class="button button-sm"
      :class="{ selected: disabled }"
      type="button"
      @click="syncDraw(true, disabled)"
    >
      <CheckMark />
    </button>
  </div>
  <div class="draw">
    <div class="container">
      <svg
        v-if="mode === Mode.BG && round > 0 && background"
        class="svg disabled"
        viewBox="0 0 300 400"
        v-html="background"
      ></svg>
      <svg
        v-if="mode === Mode.BG && round > 1 && prev && prev.type === Step.DRAW"
        class="svg disabled transparent with-opacity"
        viewBox="0 0 300 400"
        v-html="Object.values(prev.dump).join('')"
      ></svg>
      <svg
        ref="svg"
        class="svg"
        :class="{
          disabled: disabled,
          enabled: !disabled,
          secret: mode === Mode.SECRET,
          transparent: mode === Mode.BG && round > 0,
        }"
        viewBox="0 0 300 400"
      ></svg>
    </div>
  </div>
</template>

<style scoped>
.box {
  margin: 0 2vw 0.5vh;
  padding: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  font-family: arial;
  font-size: 100%;
  word-break: break-all;
  margin-right: 1vw;
}
.dimmed {
  opacity: 0.8;
}
.draw {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 2vw;
}
.container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg {
  aspect-ratio: 3/4;
  background-color: white;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  overflow: hidden;
  border-radius: 2vw;
}
.secret {
  background-color: transparent;
}
.secret >>> path[data-drauu_index] {
  animation: hide 1s both ease;
}
@keyframes hide {
  100% {
    fill: transparent;
    stroke: transparent;
  }
}
.transparent {
  background-color: transparent;
}
.with-opacity {
  opacity: 0.5;
}
</style>
