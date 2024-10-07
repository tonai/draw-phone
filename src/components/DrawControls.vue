<script setup lang="ts">
import { DrawingMode } from "drauu"
import { clear } from "../helpers"
import {
  activeBrush,
  activeColor,
  activeSize,
  canRedo,
  canUndo,
  disabled,
  drauu,
  isDrawing,
  lastDump,
  lastNodes,
  syncDraw,
  tmp,
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
  if (tmp.value) {
    clear(tmp.value, lastNodes.value, lastDump.value, drauu.value)
  }
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
    <div class="column">
      <div
        class="selected-color"
        :style="{ backgroundColor: activeColor }"
      ></div>
    </div>
    <div class="colors">
      <button
        :disabled="isDrawing"
        class="color"
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
    </div>
    <div class="sizes">
      <button
        :disabled="isDrawing"
        class="size size--small left"
        :class="{ active: activeSize === 2 }"
        aria-label="Small"
        title="Small"
        @click="size(2)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--medium"
        :class="{ active: activeSize === 6 }"
        aria-label="Medium"
        title="Medium"
        @click="size(6)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--large"
        :class="{ active: activeSize === 12 }"
        aria-label="Large"
        title="Large"
        @click="size(12)"
      ></button>
      <button
        :disabled="isDrawing"
        class="size size--xl"
        :class="{ active: activeSize === 40 }"
        aria-label="Extra Large"
        title="Extra Large"
        @click="size(40)"
      ></button>
    </div>

    <div class="actions">
      <button
        :disabled="isDrawing || !canUndo"
        class="brush"
        aria-label="Undo"
        title="Undo"
        @click="undo"
      >
        <Undo />
      </button>
      <button
        :disabled="isDrawing || !canRedo"
        class="brush"
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

    <div class="validate">
      <button
        class="button button-sm"
        :class="{ selected: disabled }"
        type="button"
        @click="syncDraw(true, disabled)"
      >
        ✓
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  --size: 7vw;
  --margin: 1vw;
  --spacing: 0.5vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  z-index: 1;
  width: calc(var(--size) * 13 + var(--margin) + 4px);
  margin: var(--spacing) auto 1.5vh;
}
.controls > * {
  position: relative;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: var(--margin);
}
.button {
  margin: auto;
}
.selected-color {
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
  border-radius: 50%;
  border: 1px solid var(--border-color);
}
.size,
.color,
.brush {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  background-color: transparent;
  transition: background-color 400ms ease;
}
.active {
  background-color: var(--selected-color);
}
.colors,
.brushes,
.sizes,
.actions {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--border-color);
  border-radius: 2vw;
  overflow: hidden;
  background-color: white;
}
.brushes,
.sizes {
  margin-top: var(--spacing);
  margin-left: calc(var(--size) * 2 + var(--margin) + 2px);
}
.colors {
  width: calc(var(--size) * 11);
}
.actions {
  position: absolute;
  right: 0;
  bottom: calc((var(--size) + var(--margin) + 2px) / 2);
}
.size--small:before {
  content: "";
  display: block;
  height: 20%;
  width: 20%;
  background-color: black;
  border-radius: 50%;
}
.size--medium:before {
  content: "";
  display: block;
  height: 40%;
  width: 40%;
  background-color: black;
  border-radius: 50%;
}
.size--large:before {
  content: "";
  display: block;
  height: 60%;
  width: 60%;
  background-color: black;
  border-radius: 50%;
}
.size--xl:before {
  content: "";
  display: block;
  height: 90%;
  width: 90%;
  background-color: black;
  border-radius: 50%;
}
.brush.clear {
  margin-left: 4vw;
  position: relative;
}
.brush.clear:before {
  content: "";
  position: absolute;
  left: -2vw;
  top: 10%;
  bottom: 10%;
  width: 2px;
  background-color: lightgrey;
}
.validate {
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
