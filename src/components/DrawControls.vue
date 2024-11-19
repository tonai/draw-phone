<script setup lang="ts">
import { DrawingMode } from "drauu"
import { clear } from "../helpers"
import {
  activeBrush,
  activeColor,
  activeSize,
  canRedo,
  canUndo,
  drauu,
  isDrawing,
  lastDump,
  lastNodes,
} from "../store"

import Arrow from "./icon/Arrow.vue"
import Circle from "./icon/Circle.vue"
import Clear from "./icon/Clear.vue"
import Eraser from "./icon/Eraser.vue"
import Line from "./icon/Line.vue"
import Pen from "./icon/Pen.vue"
import Rectangle from "./icon/Rectangle.vue"
import Redo from "./icon/Redo.vue"
import Undo from "./icon/Undo.vue"

function undo() {
  drauu.value?.undo()
}

function redo() {
  drauu.value?.redo()
}

function handleClear() {
  clear(lastNodes.value, lastDump.value, drauu.value)
  Rune.actions.clear()
}

function brush(mode: DrawingMode | "arrow") {
  activeBrush.value = mode
  if (drauu.value) {
    if (mode === "arrow") {
      drauu.value.mode = "line"
      drauu.value.brush.arrowEnd = true
    } else {
      drauu.value.mode = mode
      drauu.value.brush.arrowEnd = false
    }
  }
}

function color(color: string) {
  activeColor.value = color
  if (drauu.value) {
    drauu.value.brush.color = color
  }
}

function size(size: number) {
  activeSize.value = size
  if (drauu.value) {
    drauu.value.brush.size = size
  }
}
</script>

<template>
  <div class="controls">
    <div class="sizes">
      <button
        :disabled="isDrawing"
        class="size size--xl"
        :class="{ active: activeSize === 40, white: activeColor === '#ffffff' }"
        :style="{ color: activeColor }"
        aria-label="Extra Large"
        title="Extra Large"
        @click="size(40)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--large"
        :class="{ active: activeSize === 12, white: activeColor === '#ffffff' }"
        :style="{ color: activeColor }"
        aria-label="Large"
        title="Large"
        @click="size(12)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--medium"
        :class="{ active: activeSize === 6, white: activeColor === '#ffffff' }"
        :style="{ color: activeColor }"
        aria-label="Medium"
        title="Medium"
        @click="size(6)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--small left"
        :class="{ active: activeSize === 2, white: activeColor === '#ffffff' }"
        :style="{ color: activeColor }"
        aria-label="Small"
        title="Small"
        @click="size(2)"
      ></button>
    </div>
    <div class="colors">
      <button
        :disabled="isDrawing"
        class="color white"
        :class="{ active: activeColor === '#ffffff' }"
        style="background-color: #ffffff"
        aria-label="White"
        title="White"
        @click="color('#ffffff')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#aaaaaa' }"
        style="background-color: #aaaaaa"
        aria-label="Light grey"
        title="Light grey"
        @click="color('#aaaaaa')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#ef130b' }"
        style="background-color: #ef130b"
        aria-label="Red"
        title="Red"
        @click="color('#ef130b')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#ff7100' }"
        style="background-color: #ff7100"
        aria-label="Orange"
        title="Orange"
        @click="color('#ff7100')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#ffe400' }"
        style="background-color: #ffe400"
        aria-label="Yellow"
        title="Yellow"
        @click="color('#ffe400')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#00cc00' }"
        style="background-color: #00cc00"
        aria-label="Green"
        title="Green"
        @click="color('#00cc00')"
      ></button>

      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#000000' }"
        style="background-color: #000000"
        aria-label="Black"
        title="Black"
        @click="color('#000000')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#555555' }"
        style="background-color: #555555"
        aria-label="Grey"
        title="Grey"
        @click="color('#555555')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#740b07' }"
        style="background-color: #740b07"
        aria-label="Dark Red"
        title="Dark Red"
        @click="color('#740b07')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#c23800' }"
        style="background-color: #c23800"
        aria-label="Dark Orange"
        title="Dark Orange"
        @click="color('#c23800')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#e8a200' }"
        style="background-color: #e8a200"
        aria-label="Dark Yellow"
        title="Dark Yellow"
        @click="color('#e8a200')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#005510' }"
        style="background-color: #005510"
        aria-label="Dark Green"
        title="Dark Green"
        @click="color('#005510')"
      ></button>

      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#1cc5ac' }"
        style="background-color: #1cc5ac"
        aria-label="Blue green"
        title="Blue green"
        @click="color('#1cc5ac')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#00b2ff' }"
        style="background-color: #00b2ff"
        aria-label="Blue"
        title="Blue"
        @click="color('#00b2ff')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#231fd3' }"
        style="background-color: #231fd3"
        aria-label="Blue"
        title="Blue"
        @click="color('#231fd3')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#a300ba' }"
        style="background-color: #a300ba"
        aria-label="Purple"
        title="Purple"
        @click="color('#a300ba')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#d37caa' }"
        style="background-color: #d37caa"
        aria-label="Pink"
        title="Pink"
        @click="color('#d37caa')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#a0522d' }"
        style="background-color: #a0522d"
        aria-label="Brown"
        title="Brown"
        @click="color('#a0522d')"
      ></button>

      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#0c6759' }"
        style="background-color: #0c6759"
        aria-label="Dark Blue green"
        title="Dark Blue green"
        @click="color('#0c6759')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#00569e' }"
        style="background-color: #00569e"
        aria-label="Dark Blue"
        title="Dark Blue"
        @click="color('#00569e')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#0e0865' }"
        style="background-color: #0e0865"
        aria-label="Dark Blue"
        title="Dark Blue"
        @click="color('#0e0865')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#550069' }"
        style="background-color: #550069"
        aria-label="Dark Purple"
        title="Dark Purple"
        @click="color('#550069')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#a75574' }"
        style="background-color: #a75574"
        aria-label="Dark Pink"
        title="Dark Pink"
        @click="color('#a75574')"
      ></button>
      <button
        :disabled="isDrawing"
        class="color"
        :class="{ active: activeColor === '#63300d' }"
        style="background-color: #63300d"
        aria-label="Dark Brown"
        title="Dark Brown"
        @click="color('#63300d')"
      ></button>
    </div>
    <div class="brushes">
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'draw' }"
        aria-label="Draw"
        title="Draw"
        @click="brush('draw')"
      >
        <Pen />
      </button>
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'line' }"
        aria-label="Line"
        title="Line"
        @click="brush('line')"
      >
        <Line />
      </button>
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'arrow' }"
        aria-label="Arrow"
        title="Arrow"
        @click="brush('arrow')"
      >
        <Arrow />
      </button>
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'rectangle' }"
        aria-label="Rect"
        title="Rect"
        @click="brush('rectangle')"
      >
        <Rectangle />
      </button>
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'ellipse' }"
        aria-label="Ellipse"
        title="Ellipse"
        @click="brush('ellipse')"
      >
        <Circle />
      </button>
      <button
        :disabled="isDrawing"
        class="brush"
        :class="{ active: activeBrush === 'eraseLine' }"
        aria-label="Eraser"
        title="Eraser"
        @click="brush('eraseLine')"
      >
        <Eraser />
      </button>
      <button
        :disabled="isDrawing || !canUndo"
        class="brush undo"
        aria-label="Undo"
        title="Undo"
        @click="undo"
      >
        <Undo />
      </button>
      <button
        :disabled="isDrawing || !canRedo"
        class="brush redo"
        aria-label="Redo"
        title="Redo"
        @click="redo"
      >
        <Redo />
      </button>
      <button
        :disabled="isDrawing"
        class="brush clear"
        aria-label="Clear"
        title="Clear"
        @click="handleClear"
      >
        <Clear />
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  --size: 8vw;
  --margin: 1vw;
  --spacing: 0.5vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 1vh 0;
  position: relative;
  z-index: 1;
}
.sizes {
  display: flex;
  flex-direction: column;
  width: var(--size);
}
.size {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--size) * 0.9);
  height: calc(var(--size) * 0.9);
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  background-color: transparent;
  transition: background-color 400ms ease;
}
.size:before {
  outline: 1px solid white;
}
.size.white:before {
  outline: 1px solid black;
}
.size.active:before {
  outline: 3px solid white;
}
.size.active.white:before {
  outline: 3px solid black;
}
.size--small:before {
  content: "";
  display: block;
  height: 40%;
  width: 40%;
  background-color: currentColor;
  border-radius: 50%;
}
.size--medium:before {
  content: "";
  display: block;
  height: 60%;
  width: 60%;
  background-color: currentColor;
  border-radius: 50%;
}
.size--large:before {
  content: "";
  display: block;
  height: 80%;
  width: 80%;
  background-color: currentColor;
  border-radius: 50%;
}
.size--xl:before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  background-color: currentColor;
  border-radius: 50%;
}
.colors {
  --color-size: calc(var(--size) * 0.8);
  display: grid;
  grid-template-rows: repeat(4, var(--color-size));
  grid-template-columns: repeat(6, var(--color-size));
  gap: 1vw;
}
.color {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--color-size);
  height: var(--color-size);
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  background-color: transparent;
  transition: background-color 400ms ease;
  border: 1px solid white;
  border-radius: 0.5vw;
}
.color.active {
  outline: 3px solid white;
}
.color.active.white {
  outline: 3px solid black;
}
.brushes {
  display: grid;
  grid-template-rows: repeat(3, var(--size));
  grid-template-columns: repeat(3, var(--size));
  gap: 1vw;
}
.brush {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  padding: 1vw;
  margin: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  background-color: white;
  transition: background-color 400ms ease;
  border-radius: 0.5vw;
}
.brush.active {
  background-color: var(--selected-color);
}
.undo:disabled,
.redo:disabled {
  opacity: 0.5;
}
</style>
