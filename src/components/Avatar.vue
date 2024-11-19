<script setup lang="ts">
import { Player, PlayerId } from "rune-sdk"
import { computed } from "vue"

const props = defineProps<{
  border?: boolean
  id?: PlayerId
  name?: boolean
  player?: Player
}>()

const player = computed(
  () => props.player ?? Rune.getPlayerInfo(props.id ?? "")
)
</script>

<template>
  <div class="avatar">
    <div class="wrapper">
      <img class="image" :class="{ border }" :src="player.avatarUrl" />
    </div>
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
.wrapper {
  aspect-ratio: 1 / 1;
  position: relative;
  width: 100%;
  max-width: 15vw;
}
.image {
  display: block;
  border-radius: 50%;
  background-color: var(--border-color);
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  aspect-ratio: 1 / 1;
  left: 50%;
  translate: -50% 0;
}
.border {
  border: min(1vw, 0.5vh) solid var(--border-color);
}
.name {
  text-align: center;
  margin-top: 1vw;
  background-color: white;
  padding: 1vw;
  border-radius: 2vw;
}
</style>
