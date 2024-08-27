<script setup lang="ts">
import { playerId, playerReady } from "../store"

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
  <button
    :disabled="playerReady.includes(playerId)"
    type="button"
    @click="ready"
  >
    Ready
  </button>
</template>
