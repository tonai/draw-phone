<script setup lang="ts">
import { ref } from "vue"

import top from "../assets/top-full.webp"
import bottom from "../assets/bottom-full.webp"
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

function stop(event: Event) {
  event.stopPropagation()
}

function select(language: Locale) {
  Dusk.actions.selectLocale(language)
  opened.value = false
}

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
  <div class="start">
    <button
      v-if="playerId"
      class="button button-flags"
      type="button"
      @click="open"
    >
      <component :is="locales[locale]" />
    </button>
    <div class="logo">
      <img class="bottom" alt="Draw Phone logo" :src="bottom" />
      <img class="top" alt="Draw Phone logo" :src="top" />
    </div>
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
    <div class="players">
      <Avatar v-for="id of playerIds" :id="id" :key="id" name class="player" />
    </div>
    <button
      v-if="playerId"
      class="button button-lg"
      :class="{ selected: playerReady.includes(playerId) }"
      type="button"
      @click="ready"
    >
      {{ t("Ready") }}
    </button>
  </div>
  <div v-if="opened" class="modal" @click="close">
    <div class="modal-content" @click="stop">
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
  justify-content: space-between;
  align-items: center;
  margin: auto;
  height: 92vh;
  width: 100%;
}
.logo {
  flex-shrink: 1;
  height: 30vh;
  position: relative;
  margin-top: 3vh;
}
.bottom {
  max-width: 100%;
  max-height: 100%;
}
.top {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  inset: 0;
  z-index: -1;
  animation: ring 8s linear infinite;
  transform-origin: 50% 15%;
}
@keyframes ring {
  85% {
    rotate: 0deg;
  }
  86% {
    rotate: 10deg;
  }
  87% {
    rotate: -10deg;
  }
  89% {
    rotate: 10deg;
  }
  91% {
    rotate: -10deg;
  }
  93% {
    rotate: 10deg;
  }
  95% {
    rotate: -10deg;
  }
  97% {
    rotate: 10deg;
  }
  99% {
    rotate: -10deg;
  }
  100% {
    rotate: 0deg;
  }
}
.title {
  font: bold 72px serif;
  width: 100%;
  aspect-ratio: 45 / 7;
  flex-shrink: 0;
}
.text {
  fill: white;
  stroke: #001b2e;
  stroke-width: min(0.5vw, 0.25vh);
  stroke-linejoin: round;
  animation: stoke 5s linear infinite;
  translate: 0 12%;
}
@keyframes stoke {
  0% {
    stroke-width: min(0.5vw, 0.25vh);
  }
  50% {
    stroke-width: min(1vw, 0.5vh);
  }
}
.button-flags {
  padding: 0 3vw 0 4vw;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3vw;
  align-self: flex-end;
  margin-right: 4vh;
  position: absolute;
}
.button-flags:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: var(--border-color) transparent;
  border-width: 3vw 3vw 0;
  position: relative;
}
.players {
  display: grid;
  gap: 2vw;
  width: 90vw;
  grid-template-columns: 1fr 1fr;
  max-height: 40vh;
}
.player {
  align-self: center;
  min-width: 0;
  min-height: 0;
  height: 100%;
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
  gap: 1vh;
}
.flag {
  border: 0;
  background-color: transparent;
  padding: 1vw;
  margin: 0;
}
</style>
