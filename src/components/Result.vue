<script setup lang="ts">
import { computed } from "vue"
import { PlayerId } from "dusk-games-sdk"

import { DrawRound, Step, WriteRound } from "../types"

import Appear from "./Appear.vue"
import Avatar from "./Avatar.vue"

const props = defineProps<{
  playerId: PlayerId
  result: DrawRound | WriteRound
}>()

const player = computed(() => Dusk.getPlayerInfo(props.playerId))
</script>

<template>
  <tr class="line">
    <td colspan="2">
      <div class="name">{{ player.displayName }}</div>
    </td>
  </tr>
  <tr class="line">
    <td class="avatar"><Avatar :player="player" /></td>
    <td>
      <div class="box">
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
</template>

<style scoped>
.name {
  margin-top: 4vw;
}
.avatar {
  text-align: center;
  width: 10vw;
  vertical-align: top;
}
.box {
  background: white;
  border-radius: 2vw;
  font-size: 6vw;
  padding: 2vw;
  word-break: break-word;
  margin-left: 2vw;
  position: relative;
  display: inline-block;
  animation: visible ease 1s;
}
.box:before {
  content: "";
  position: absolute;
  left: 1px;
  top: 3vw;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent white;
  border-width: 2vw 2vw 2vw 0;
  translate: -2vw 0;
}
.inner {
  width: 76vw;
}
.svg {
  width: 100%;
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
