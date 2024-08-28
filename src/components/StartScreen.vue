<script setup lang="ts">
import { ref } from "vue"

import logo from "../assets/logo.webp"
import {
  Locale,
  locale,
  locales,
  playerId,
  playerIds,
  playerReady,
  t,
} from "../store"

import Avatar from "./Avatar.vue"

const opened = ref(false)

function open() {
  opened.value = true
}

function close() {
  opened.value = false
}

function select(language: Locale) {
  Dusk.actions.selectLocale(language)
}

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
  <div class="start">
    <img class="logo" alt="Draw Phone logo" :src="logo" />
    <svg class="title" viewBox="0 0 450 70">
      <text
        class="text"
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        Draw Phone
      </text>
    </svg>
    <button class="button button-flags" type="button" @click="open">
      <component :is="locales[locale]" />
    </button>
    <div class="players">
      <Avatar v-for="id of playerIds" :id="id" :key="id" name class="player" />
    </div>
    <button
      class="button"
      :class="{ selected: playerReady.includes(playerId) }"
      type="button"
      @click="ready"
    >
      {{ t("Ready") }}
    </button>
  </div>
  <div v-if="opened" class="modal" @click="close">
    <div class="modal-content">
      <button
        v-for="(component, lang) of locales"
        :key="lang"
        class="flag"
        type="button"
        @click="select(lang)"
      >
        <component :is="component" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  margin: auto;
}
.logo {
  max-width: 60vw;
}
.title {
  font:
    bold 18vw Arial,
    sans-serif;
  width: 100%;
}
.text {
  fill: white;
  stroke: #001b2e;
  stroke-width: 0.5vw;
  stroke-linejoin: round;
  /* animation       : 2s pulsate infinite; */
}
.button-flags {
  padding: 1vw 3vw 1vw 5vw;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3vw;
}
.button-flags:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: var(--border-color) transparent;
  border-width: 3vw 3vw 0;
}
.players {
  display: grid;
  gap: 4vw;
  width: 90vw;
  grid-template-columns: 1fr 1fr;
  flex: 1;
}
.player {
  align-self: center;
}
.modal {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid var(--border-color);
  padding: 10vh 20vw;
  border-radius: 5vw;
  gap: 2vh;
}
.flag {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin: 0;
}
</style>
