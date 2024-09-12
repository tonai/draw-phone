import { Drauu, DrawingMode } from "drauu"
import { type Component, computed, ref } from "vue"
import { createTranslator } from "@tonai/game-utils"

import { translations } from "../constants"
import Cn from "../components/icon/Cn.vue"
import Es from "../components/icon/Es.vue"
import Fr from "../components/icon/Fr.vue"
import Pt from "../components/icon/Pt.vue"
import Ru from "../components/icon/Ru.vue"
import Uk from "../components/icon/Uk.vue"
import { getDiff } from "../helpers"
import { PlayerRounds, Step } from "../types"

export const locales: Record<string, Component> = {
  en: Uk,
  fr: Fr,
  ru: Ru,
  es: Es,
  pt: Pt,
  cn: Cn,
}
export type Locale = keyof typeof locales
export const locale = ref<Locale>("en")
export const translator = createTranslator(translations)
export function t(word: string) {
  return translator(locale.value)(word)
}

export const countDown = ref<number>(0)

export const drauu = ref<Drauu>()
export const canUndo = ref(false)
export const canRedo = ref(false)
export const isDrawing = ref(false)

export const step = ref(Step.WAIT)
export const playerId = ref("")
export const playerIds = ref<string[]>([])
export const playerReady = ref<string[]>([])

export const round = ref(0)
export const playerRounds = ref<PlayerRounds>([])

export const activeBrush = ref<DrawingMode | "arrow">("draw")
export const activeColor = ref<string>("#000000")
export const activeSize = ref<number>(6)

export const svg = ref<SVGSVGElement>()
export const tmp = ref<SVGSVGElement>()
export const lastTime = ref<Record<string, number>>({})
export const lastDump = ref<string[]>([])
export const lastNodes = ref<SVGElement[]>([])

export const isPlayer = computed(() => playerIds.value.includes(playerId.value))
export const disabled = computed(() =>
  playerReady.value.includes(playerId.value)
)

export const prev = computed(() =>
  round.value > 0
    ? playerRounds.value[round.value - 1][
        playerRounds.value[round.value][playerId.value].prev!
      ]
    : undefined
)

export function syncDraw(done = false, enabled = false) {
  if (svg.value && drauu.value) {
    const nodes = [...svg.value.children].filter(
      (node) =>
        node instanceof SVGElement &&
        "id" in node.dataset &&
        "time" in node.dataset
    ) as SVGElement[]
    const dump = nodes.map((node) => node.outerHTML)
    const diff = getDiff(
      playerId.value,
      lastNodes.value,
      nodes,
      lastDump.value,
      dump
    )
    if (diff.length > 0 || done) {
      Dusk.actions.draw({ diff, done, enabled })
    }
    lastNodes.value = nodes
    lastDump.value = dump
  }
}
