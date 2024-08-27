<script setup lang="ts">
import { onMounted, ref } from "vue"

const appear = ref<HTMLDivElement>()
const width = ref("6vw")
const height = ref("6vw")

onMounted(() => {
  setTimeout(() => {
    if (appear.value) {
      width.value = `${appear.value.scrollWidth}px`
      height.value = `${appear.value.scrollHeight}px`
      appear.value.classList.add("visible")
    }
  }, 1000)
})
</script>

<template>
  <div class="appear" ref="appear" :style="{ width, height }">
    <slot></slot>
  </div>
</template>

<style scoped>
.appear {
  box-sizing: border-box;
  overflow: hidden;
  transition: all ease 1s;
}
.appear > * {
  opacity: 0;
  transition: all ease 1s;
}
.visible > * {
  opacity: 1;
}
</style>
