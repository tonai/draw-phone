<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
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
  playerId,
  prev,
  svg,
  syncDraw,
  t,
} from "../store"
import { Mode, Step } from "../types"

const interval = ref<number>()

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
      currentNode.dataset.id = playerId.value
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
  <div v-if="prev && prev.type === Step.WRITE" class="box">
    {{ t("It's time to draw:") }}<br />
    {{ prev.text }}
  </div>
  <div class="draw">
    <div class="container">
      <svg
        ref="svg"
        class="svg"
        :class="{
          disabled: disabled,
          enabled: !disabled,
          secret: mode === Mode.SECRET,
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
}
.draw {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--border-color);
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
</style>
