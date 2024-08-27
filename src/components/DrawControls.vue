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
  lastDump,
  lastNodes,
  tmp,
} from "../store"

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
  Dusk.actions.clear()
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
        class="color top left"
        :class="{ active: activeColor === '#ffffff' }"
        style="background-color: #ffffff"
        aria-label="White"
        title="White"
        @click="color('#ffffff')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#ef130b' }"
        style="background-color: #ef130b"
        aria-label="Red"
        title="Red"
        @click="color('#ef130b')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#ff7100' }"
        style="background-color: #ff7100"
        aria-label="Orange"
        title="Orange"
        @click="color('#ff7100')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#ffe400' }"
        style="background-color: #ffe400"
        aria-label="Yellow"
        title="Yellow"
        @click="color('#ffe400')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#00cc00' }"
        style="background-color: #00cc00"
        aria-label="Green"
        title="Green"
        @click="color('#00cc00')"
      ></button>

      <button
        class="color top"
        :class="{ active: activeColor === '#00b2ff' }"
        style="background-color: #00b2ff"
        aria-label="Blue"
        title="Blue"
        @click="color('#00b2ff')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#231fd3' }"
        style="background-color: #231fd3"
        aria-label="Blue"
        title="Blue"
        @click="color('#231fd3')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#a300ba' }"
        style="background-color: #a300ba"
        aria-label="Purple"
        title="Purple"
        @click="color('#a300ba')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#d37caa' }"
        style="background-color: #d37caa"
        aria-label="Pink"
        title="Pink"
        @click="color('#d37caa')"
      ></button>
      <button
        class="color top"
        :class="{ active: activeColor === '#a0522d' }"
        style="background-color: #a0522d"
        aria-label="Brown"
        title="Brown"
        @click="color('#a0522d')"
      ></button>

      <button
        class="color left"
        :class="{ active: activeColor === '#000000' }"
        style="background-color: #000000"
        aria-label="Black"
        title="Black"
        @click="color('#000000')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#740b07' }"
        style="background-color: #740b07"
        aria-label="Dark Red"
        title="Dark Red"
        @click="color('#740b07')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#c23800' }"
        style="background-color: #c23800"
        aria-label="Dark Orange"
        title="Dark Orange"
        @click="color('#c23800')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#e8a200' }"
        style="background-color: #e8a200"
        aria-label="Dark Yellow"
        title="Dark Yellow"
        @click="color('#e8a200')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#005510' }"
        style="background-color: #005510"
        aria-label="Dark Green"
        title="Dark Green"
        @click="color('#005510')"
      ></button>

      <button
        class="color"
        :class="{ active: activeColor === '#00569e' }"
        style="background-color: #00569e"
        aria-label="Dark Blue"
        title="Dark Blue"
        @click="color('#00569e')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#0e0865' }"
        style="background-color: #0e0865"
        aria-label="Dark Blue"
        title="Dark Blue"
        @click="color('#0e0865')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#550069' }"
        style="background-color: #550069"
        aria-label="Dark Purple"
        title="Dark Purple"
        @click="color('#550069')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#a75574' }"
        style="background-color: #a75574"
        aria-label="Dark Pink"
        title="Dark Pink"
        @click="color('#a75574')"
      ></button>
      <button
        class="color"
        :class="{ active: activeColor === '#63300d' }"
        style="background-color: #63300d"
        aria-label="Dark Brown"
        title="Dark Brown"
        @click="color('#63300d')"
      ></button>

      <button
        class="brush left"
        aria-label="Clear"
        title="Clear"
        @click="handleClear"
      >
        🗑
      </button>
      <button
        class="brush"
        :disabled="!canUndo"
        aria-label="Undo"
        title="Undo"
        @click="undo"
      >
        ↩️
      </button>
      <button
        :disabled="!canRedo"
        class="brush"
        aria-label="Redo"
        title="Redo"
        @click="redo"
      >
        ↪️
      </button>

      <button
        class="brush space"
        :class="{ active: activeBrush === 'draw' }"
        aria-label="Draw"
        title="Draw"
        @click="brush('draw')"
      >
        ✏️
      </button>
      <button
        class="brush"
        :class="{ active: activeBrush === 'line' }"
        aria-label="Line"
        title="Line"
        @click="brush('line')"
      >
        ⁄
      </button>
      <button
        class="brush"
        :class="{ active: activeBrush === 'arrow' }"
        aria-label="Arrow"
        title="Arrow"
        @click="brush('arrow')"
      >
        ↗
      </button>
      <button
        class="brush"
        :class="{ active: activeBrush === 'eraseLine' }"
        aria-label="Eraser"
        title="Eraser"
        @click="brush('eraseLine')"
      >
        🧹
      </button>
      <button
        class="brush"
        :class="{ active: activeBrush === 'rectangle' }"
        aria-label="Rect"
        title="Rect"
        @click="brush('rectangle')"
      >
        □
      </button>
      <button
        class="brush"
        :class="{ active: activeBrush === 'ellipse' }"
        aria-label="Ellipse"
        title="Ellipse"
        @click="brush('ellipse')"
      >
        ○
      </button>

      <div class="bottom">
        <div class="word">?</div>

        <button
          class="size size--small left"
          :class="{ active: activeSize === 2 }"
          aria-label="Small"
          title="Small"
          @click="size(2)"
        ></button>
        <button
          class="size size--medium"
          :class="{ active: activeSize === 6 }"
          aria-label="Medium"
          title="Medium"
          @click="size(6)"
        ></button>
        <button
          class="size size--large"
          :class="{ active: activeSize === 12 }"
          aria-label="Large"
          title="Large"
          @click="size(12)"
        ></button>
        <button
          class="size size--xl"
          :class="{ active: activeSize === 40 }"
          aria-label="Extra Large"
          title="Extra Large"
          @click="size(40)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  --size: 7.8vw;
  --margin: 1vw;
  --padding: 0.5vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5vh 0 var(--padding);
  position: relative;
  background-color: white;
  font-size: 5vw;
  z-index: 1;
}
.controls:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  background: center top url(/img/line.png) repeat-x;
  height: 6px;
}
.controls > * {
  position: relative;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 32vw;
  margin-right: var(--margin);
}
.button {
  margin: auto;
}
.selected-color {
  width: calc(var(--size) * 2);
  height: calc(var(--size) * 2);
  border-radius: 50%;
  border: 1px solid black;
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
  background-color: #00ff00;
}
.colors {
  display: flex;
  flex-wrap: wrap;
  width: calc(var(--size) * 10);
}
.top {
  border-top: 1px solid black;
}
.left {
  border-left: 1px solid black;
}
.size.left {
  width: calc(var(--size) + 1px);
}
.color,
.brush,
.size {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}
.space {
  margin-left: calc(var(--size) - 1px);
  border-left: 1px solid black;
  width: calc(var(--size) + 1px);
}
.bottom {
  display: flex;
  width: calc(var(--size) * 12 + var(--margin));
  position: absolute;
  bottom: calc(var(--size) * -1);
  right: 0;
}
/* .free .bottom {
  width: calc(var(--size) * 10);
} */
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
.word {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.8vw;
  text-decoration: underline;
}
</style>
