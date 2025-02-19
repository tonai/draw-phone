<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { PlayerId } from "rune-sdk"

import { mode, playerRounds } from "../store"
import { DrawRound, Mode, WriteRound } from "../types"

import AnimatedResult from "./AnimatedResult.vue"
import Result from "./Result.vue"

const intervalDelay = 5000

interface PlayerResult {
  id: string
  playerId: PlayerId
  result: DrawRound | WriteRound
  separator: boolean
}

interface AnimatedPlayerResult {
  id: string
  playerId: PlayerId
  background: DrawRound
  frames: DrawRound[]
  separator: boolean
}

const results = computed(() => {
  const players = Object.keys(playerRounds.value?.[0] ?? {})
  if (mode.value === Mode.BG) {
    const results: AnimatedPlayerResult[] = []
    for (let i = 0; i < players.length; i++) {
      let round = 0
      let playerId = players[i]
      let background = playerRounds.value?.[0]?.[playerId] as DrawRound
      if (background) {
        let result = background
        let frames: DrawRound[] = []
        while (result && result.next) {
          round++
          result = playerRounds.value?.[round]?.[result.next] as DrawRound
          if (result) {
            frames.push(result)
          }
        }
        results.push({
          id: `${i}-${playerId}`,
          playerId,
          background,
          frames,
          separator: true,
        })
      }
    }
    return results
  } else {
    const results: PlayerResult[] = []
    for (let i = 0; i < players.length; i++) {
      let round = 0
      let playerId = players[i]
      let result = playerRounds.value?.[round]?.[playerId]
      if (result) {
        results.push({
          id: `${i}-${playerId}`,
          playerId,
          result,
          separator: i !== 0,
        })
        while (result && result.next) {
          round++
          playerId = result.next
          result = playerRounds.value?.[round]?.[playerId]
          if (result) {
            results.push({
              id: `${i}-${playerId}`,
              playerId,
              result,
              separator: false,
            })
          }
        }
      }
    }
    return results
  }
})

const renderedIndex = ref(1)
const rendererResults = computed(() =>
  results.value.slice(0, renderedIndex.value).reverse()
)

onMounted(() => {
  const interval = setInterval(() => {
    if (renderedIndex.value === results.value.length) {
      clearInterval(interval)
      Rune.actions.gameOver()
    } else {
      renderedIndex.value++
    }
  }, intervalDelay)
})
</script>

<template>
  <div class="results">
    <table class="table">
      <tbody>
        <template v-if="mode === Mode.BG">
          <AnimatedResult
            v-for="result of rendererResults"
            :key="result.id"
            :player-id="result.playerId"
            :background="(result as AnimatedPlayerResult).background"
            :frames="(result as AnimatedPlayerResult).frames"
            :separator="result.separator"
          />
        </template>
        <template v-else>
          <Result
            v-for="result of rendererResults"
            :key="result.id"
            :player-id="result.playerId"
            :result="(result as PlayerResult).result"
            :separator="result.separator"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.results {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  width: 100%;
  overflow: auto;
}
.table {
  border-collapse: collapse;
  width: 90vw;
  margin-bottom: 4vw;
}
</style>
