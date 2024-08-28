<script setup lang="ts">
import { Player, PlayerId } from "dusk-games-sdk"
import { computed } from "vue"

const props = defineProps<{
  id?: PlayerId
  name?: boolean
  player?: Player
}>()

const player = computed(
  () => props.player ?? Dusk.getPlayerInfo(props.id ?? "")
)
</script>

<template>
  <div class="avatar">
    <img class="image" :src="player.avatarUrl" />
    <div v-if="name" class="name">{{ player.displayName }}</div>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  align-items: center;
}
.image {
  display: block;
  max-width: 14vw;
  width: 100%;
  border: 1vw solid var(--border-color);
  border-radius: 50%;
  background-color: var(--border-color);
  box-sizing: border-box;
}
.name {
  text-align: center;
  margin-top: 1vw;
  background-color: white;
  padding: 1vw;
  border-radius: 2vw;
}
</style>
