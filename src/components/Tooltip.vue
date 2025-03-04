<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const opened = ref(false)

function close() {
  if (opened.value) {
    opened.value = false
  }
}
function open(event: Event) {
  event.stopPropagation()
  opened.value = true
}

function stop(event: Event) {
  event.stopPropagation()
}

onMounted(() => {
  document.body.addEventListener("click", close)
})

onUnmounted(() => {
  document.body.removeEventListener("click", close)
})
</script>

<template>
  <div class="tooltip">
    <button class="tooltip__button text" @click="open">?</button>
    <div
      class="tooltip__content"
      :class="{ 'tooltip__content--open': opened }"
      @click="stop"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
}
.tooltip__button {
  display: block;
  margin: 0;
  padding: 0;
  border: var(--size) solid white;
  background: var(--bg-color);
  width: calc(var(--size) * 10);
  height: calc(var(--size) * 10);
  border-radius: 100px;
  color: white;
  font-weight: bold;
}
.tooltip__button:hover {
  scale: 1.1;
}
.tooltip__content {
  position: absolute;
  max-width: calc(var(--size) * 65);
  width: max-content;
  background-color: var(--box-color);
  top: -10%;
  left: 50%;
  padding: calc(var(--size) * 4);
  transform-origin: bottom center;
  translate: -50% -100%;
  transition:
    scale 400ms ease,
    opacity 400ms ease;
  scale: 0;
  opacity: 0;
  border: 2px solid var(--border-color);
  border-radius: calc(var(--size) * 4) !important;
  background: white;
}
.tooltip__content >>> p {
  margin: 0;
}
.tooltip__content--open {
  scale: 1;
  opacity: 1;
}
</style>
