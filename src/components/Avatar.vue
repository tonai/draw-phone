<script setup lang="ts">
import { Player, PlayerId } from "dusk-games-sdk";
import { computed } from "vue"

const props = defineProps<{
  id?: PlayerId
  player?: Player
}>()

const player = computed(() => props.player ?? Dusk.getPlayerInfo(props.id ?? ''))
</script>

<template>
  <div class="avatar">
    <img class="image" :src="player.avatarUrl" />
  </div>
</template>

<style scoped>
.avatar {
  display: inline-block;
  position: relative;
  border: 1vw solid black;
  border-radius: 50%;
  background-color: black;
  box-sizing: border-box;
}
.image {
  display: block;
  max-width: 12vw;
  width: 100%;
}
</style>
