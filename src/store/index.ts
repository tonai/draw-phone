import { Drauu, DrawingMode } from "drauu"
import { computed, ref } from "vue"

import { PlayerRounds, Step } from "../types"

export const countDown = ref<number>(0)

export const drauu = ref<Drauu>()
export const canUndo = ref(false)
export const canRedo = ref(false)

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

export const prev = computed(() =>
  round.value > 0
    ? playerRounds.value[round.value - 1][
        playerRounds.value[round.value][playerId.value].prev!
      ]
    : undefined
)
