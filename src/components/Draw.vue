<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { createDrauu } from "drauu"
import { getDiff } from "../helpers"
import {
  activeBrush,
  activeColor,
  activeSize,
  canRedo,
  canUndo,
  countDown,
  drauu,
  playerId,
  lastDump,
  lastNodes,
  prev,
  svg,
  tmp,
} from "../store"
import { Step } from "../types"

const interval = ref<number>()

function syncDraw(done = false) {
  if (svg.value && drauu.value) {
    const nodes = [...svg.value.children].filter(
      (node) =>
        node instanceof SVGElement &&
        "id" in node.dataset &&
        "time" in node.dataset
    ) as SVGElement[]
    const dump = nodes.map((node) => node.outerHTML)
    const diff = getDiff(
      playerId.value,
      lastNodes.value,
      nodes,
      lastDump.value,
      dump
    )
    if (diff.length > 0 || done) {
      Dusk.actions.draw({ diff, done })
    }
    lastNodes.value = nodes
    lastDump.value = dump
  }
}

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
  setTimeout(() => {
    // @ts-expect-error private access
    const currentNode = drauu.value?._currentNode
    if (currentNode) {
      currentNode.dataset.time = String(Date.now())
      currentNode.dataset.id = playerId.value
    }
  })
}

// function committed(node?: SVGElement) {
//   if (node) {
//     node.dataset.committed = "1"
//   }
// }

function updateState() {
  if (drauu.value) {
    canRedo.value = drauu.value.canRedo()
    canUndo.value = drauu.value.canUndo()
  }
}

onMounted(() => {
  if (drauu.value) {
    drauu.value.on("start", start)
    // drauu.value.on("committed", committed)
    drauu.value.on("changed", updateState)
  }
})
</script>

<template>
  <div v-if="prev && prev.type === Step.WRITE" class="box">
    {{ prev.text }}
  </div>
  <div class="draw">
    <div class="container">
      <svg
        ref="svg"
        class="svg"
        :class="{
          disabled: false,
          enabled: true,
        }"
        viewBox="0 0 300 400"
      ></svg>
      <svg ref="tmp" class="svg tmp" viewBox="0 0 300 400"></svg>
    </div>
  </div>
</template>

<style scoped>
.box {
  margin: 0 2vw 2vw;
}
.draw {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 2vw;
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
.tmp {
  background-color: transparent;
  pointer-events: none;
}
</style>
