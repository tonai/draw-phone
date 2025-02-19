<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { initSounds, playMusic } from "@tonai/game-utils"

import {
  countDown,
  isPlayer,
  locale,
  mode,
  playerId,
  playerIdMap,
  playerIds,
  playerReady,
  playerRounds,
  round,
  step,
  t,
  votes,
} from "../store"
import { Step } from "../types"

import CountDown from "./CountDown.vue"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"
import Results from "./Results.vue"
import StartScreen from "./StartScreen.vue"
import Write from "./Write.vue"

onMounted(() => {
  Rune.initClient({
    onChange: ({ game, yourPlayerId }) => {
      if (yourPlayerId && playerId.value !== yourPlayerId) {
        playerId.value = yourPlayerId
      }
      if (
        yourPlayerId &&
        locale.value !== game.persisted[yourPlayerId].locale
      ) {
        locale.value = game.persisted[yourPlayerId].locale ?? "en"
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
        step.value = game.step
        if (game.step === Step.RESULTS) {
          volume.value = 1
          sound.value = "results"
        } else if (game.step !== Step.WAIT && sound.value !== "play") {
          volume.value = 0.4
          sound.value = "play"
        } else if (game.step === Step.WAIT) {
          sound.value = "start"
        }
      }
      if (round.value !== game.round) {
        round.value = game.round
      }
      if (playerRounds.value !== game.playerRounds) {
        playerRounds.value = game.playerRounds
      }
      if (votes.value !== game.votes) {
        votes.value = game.votes
      }
      if (mode.value !== game.mode) {
        mode.value = game.mode
      }
      if (playerIdMap.value !== game.playerIdMap) {
        playerIdMap.value = game.playerIdMap
      }
    },
  })
})

const sound = ref("")
const volume = ref(1)
const music = ref<HTMLAudioElement>()

watch(sound, () => {
  if (sound.value) {
    music.value?.pause()
    music.value = playMusic(sound.value, volume.value)
  }
})

onMounted(() => {
  initSounds({
    play: "play.mp3",
    results: "results.mp3",
    start: "start.mp3",
  })
  sound.value = "start"
})
onUnmounted(() => music.value?.pause())
</script>

<template>
  <div class="app">
    <CountDown v-if="step === Step.WRITE || step === Step.DRAW" />
    <StartScreen v-if="step === Step.WAIT" />
    <Write v-if="step === Step.WRITE && isPlayer" />
    <div v-if="step === Step.DRAW && isPlayer" class="container">
      <Draw :key="round" />
      <DrawControls />
    </div>
    <Results v-if="step === Step.RESULTS" />
    <div v-else-if="step !== Step.WAIT && !isPlayer" class="spectator">
      {{ t("Waiting for results") }}
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
  width: 100%;
}
.spectator {
  flex: 1;
  font-size: 8vw;
  display: flex;
  align-items: center;
}
</style>
