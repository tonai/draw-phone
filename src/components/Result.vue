<script setup lang="ts">
import { computed } from "vue"
import { PlayerId } from "rune-sdk"

import { DrawRound, Step, WriteRound } from "../types"

import Appear from "./Appear.vue"
import Avatar from "./Avatar.vue"

const props = defineProps<{
  playerId: PlayerId
  result: DrawRound | WriteRound
  separator: boolean
}>()

const player = computed(() => Rune.getPlayerInfo(props.playerId))
</script>

<template>
  <tr class="line">
    <td class="cell" colspan="2">
      <div class="name">{{ player.displayName }}</div>
    </td>
  </tr>
  <tr class="line">
    <td class="avatar cell"><Avatar :player="player" /></td>
    <td class="cell">
      <div class="box say">
        <Appear>
          <div v-if="result.type === Step.WRITE" class="inner">
            {{ result.text }}
          </div>
          <div v-else class="inner">
            <svg
              class="svg disabled"
              viewBox="0 0 300 400"
              v-html="Object.values(result.dump).join('')"
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
</style>
