<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { PlayerId } from "dusk-games-sdk"

import { playerIds, playerRounds, resultPlayerIndex } from "../store"
import { DrawRound, Step, WriteRound } from "../types"

import Result from "./Result.vue"

const intervalDelay = 5000

const results = computed(() => {
  const results: { playerId: PlayerId; result: DrawRound | WriteRound }[] = []
  let round = 0
  let playerId = playerIds.value[resultPlayerIndex.value]
  let result = playerRounds.value[round][playerId]
  results.push({
    playerId,
    result,
  })
  while (result.next) {
    round++
    playerId = result.next
    result = playerRounds.value[round][playerId]
    results.push({
      playerId,
      result,
    })
  }
  return results
})

const renderedIndex = ref(1)
const rendererResults = computed(() =>
  results.value.slice(0, renderedIndex.value).reverse()
)

onMounted(() => {
  const interval = setInterval(() => {
    renderedIndex.value++
    if (renderedIndex.value === results.value.length) {
      clearInterval(interval)
    }
  }, intervalDelay)
})
</script>

<template>
  <table class="table">
    <tbody>
      <Result
        v-for="result of rendererResults"
        :key="result.playerId"
        :playerId="result.playerId"
        :result="result.result"
      />
    </tbody>
  </table>
</template>

<style scoped>
.table {
  border-collapse: collapse;
  margin: 0 4vw;
}
</style>
