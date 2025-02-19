<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { PlayerId } from "rune-sdk"

import { DrawRound } from "../types"
import { getPlayer } from "../helpers"

import Appear from "./Appear.vue"
import Avatar from "./Avatar.vue"

const props = defineProps<{
  playerId: PlayerId
  background: DrawRound
  frames: DrawRound[]
  separator: boolean
}>()

const frameIndex = ref(0)
const interval = ref<number>()

onMounted(() => {
  setTimeout(() => {
    interval.value = setInterval(() => {
      frameIndex.value++
      if (frameIndex.value === props.frames.length) {
        frameIndex.value = 0
      }
    }, 1000)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

const player = computed(() => getPlayer(props.playerId))
</script>

<template>
  <tr class="line">
    <td class="cell" colspan="2">
      <div class="name">{{ player.displayName }}</div>
    </td>
  </tr>
  <tr class="line">
    <td class="avatar cell"><Avatar border :player="player" /></td>
    <td class="cell">
      <div class="box say">
        <Appear>
          <div class="inner">
            <svg
              class="svg disabled"
              viewBox="0 0 300 400"
              v-html="Object.values(background.dump).join('')"
            ></svg>
            <svg
              class="svg disabled absolute"
              viewBox="0 0 300 400"
              v-html="Object.values(frames[frameIndex].dump).join('')"
            ></svg>
          </div>
        </Appear>
      </div>
    </td>
  </tr>
  <tr v-if="separator">
    <td class="cell" colspan="2">
      <hr class="separator" />
    </td>
  </tr>
</template>

<style scoped>
.cell {
  padding: 0;
}
.separator {
  margin: 4vw 0 0 0;
  width: 100%;
  border-color: var(--border-color);
}
.name {
  margin: 4vw 0 1vw;
  font-weight: bold;
}
.avatar {
  text-align: center;
  width: 10vw;
  vertical-align: top;
}
.inner {
  width: 74vw;
  line-height: 6vw;
  font-size: 80%;
  word-break: break-all;
  position: relative;
}
.svg {
  width: 100%;
  display: block;
}
@keyframes visible {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.absolute {
  position: absolute;
  inset: 0;
}
</style>
