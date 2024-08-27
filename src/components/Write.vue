<script setup lang="ts">
import { ref, watch } from 'vue';

import { countDown} from '../store'

const text = ref('');

watch(countDown, () => {
  if (countDown.value === 0) {
    Dusk.actions.write(text.value);
  }
})
</script>

<template>
  <input v-model="text" />
</template>