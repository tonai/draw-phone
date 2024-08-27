<script setup lang="ts">
import { formatNumber } from "@tonai/game-utils"

import { countDown } from "../store"
</script>

<template>
  <div class="countdown">{{ formatNumber(countDown) }}</div>
</template>
