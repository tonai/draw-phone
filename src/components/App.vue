<script setup lang="ts">
import { onMounted } from "vue"

import {
  countDown,
  playerId,
  playerIds,
  playerReady,
  playerRounds,
  resultPlayerIndex,
  round,
  step,
} from "../store"
import { Step } from "../types"

import CountDown from "./CountDown.vue"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"
import Results from "./Results.vue"
import StartScreen from "./StartScreen.vue"
import Write from "./Write.vue"

onMounted(() => {
  Dusk.initClient({
    onChange: ({ action, game, yourPlayerId }) => {
      if (yourPlayerId && playerId.value !== yourPlayerId) {
        playerId.value = yourPlayerId
      }
      if (playerIds.value !== game.playerIds) {
        playerIds.value = game.playerIds
      }
      if (playerReady.value !== game.playerReady) {
        playerReady.value = game.playerReady
      }
      if (countDown.value !== game.countDown) {
        countDown.value = game.countDown
      }
      if (step.value !== game.step) {
        // if (game.step === Step.PLAY) {
        //   playSound("start")
        // }
        step.value = game.step
      }
      if (round.value !== game.round) {
        round.value = game.round
      }
      if (playerRounds.value !== game.playerRounds) {
        playerRounds.value = game.playerRounds
      }
      if (resultPlayerIndex.value !== game.resultPlayerIndex) {
        resultPlayerIndex.value = game.resultPlayerIndex
      }
    },
  })
})
</script>

<template>
  <div class="app">
    <CountDown v-if="step === Step.WRITE || step === Step.DRAW"/>
    <StartScreen v-if="step === Step.WAIT" />
    <Write v-else-if="step === Step.WRITE" />
    <Results v-else-if="step === Step.RESULTS" />
    <div v-else class="container">
      <Draw />
      <DrawControls />
    </div>
  </div>
</template>

<style scoped>
.app {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
