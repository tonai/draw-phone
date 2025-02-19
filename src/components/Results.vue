<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { PlayerId } from "rune-sdk"

import { playerRounds } from "../store"
import { DrawRound, WriteRound } from "../types"

import Result from "./Result.vue"

const intervalDelay = 5000

const results = computed(() => {
  const results: {
    id: string
    playerId: PlayerId
    result: DrawRound | WriteRound
    separator: boolean
  }[] = []
  const players = Object.keys(playerRounds.value?.[0] ?? {})
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
        <Result
          v-for="result of rendererResults"
          :key="result.id"
          :player-id="result.playerId"
          :result="result.result"
          :separator="result.separator"
        />
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
