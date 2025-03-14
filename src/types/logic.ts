import { RuneClient, PlayerId } from "rune-sdk"

import { DiffAction } from "./draw"

export enum Step {
  DRAW = "draw",
  RESULTS = "results",
  WAIT = "wait",
  WRITE = "write",
}

export enum Mode {
  CLASSIC = "Classic",
  SECRET = "Secret",
  BG = "Background",
}

export interface Round {
  done: boolean
  next?: PlayerId
  prev?: PlayerId
}

export interface DrawRound extends Round {
  type: Step.DRAW
  dump: Record<string, string>
}

export interface WriteRound extends Round {
  type: Step.WRITE
  text: string
}

export type PlayerRounds = Record<PlayerId, DrawRound | WriteRound>[]

export interface GameState {
  countDown: number
  id: string
  mode: Mode
  playerIds: PlayerId[]
  playerIdMap: Record<PlayerId, PlayerId>
  playerReady: PlayerId[]
  playerRounds: PlayerRounds
  round: number
  startTime: number
  startPlayerIds: PlayerId[]
  step: Step
  votes: Record<PlayerId, Mode | undefined>
}

type GameActions = {
  clear: () => void
  draw: (draw: { diff: DiffAction[]; done: boolean; enabled: boolean }) => void
  gameOver: () => void
  selectLocale: (locale: string) => void
  write: (data: { enabled: boolean; text: string }) => void
  ready: (vote: Mode) => void
}

type Persisted = {
  gameId?: string
  prevPlayerId?: PlayerId
  locale: string
}

declare global {
  const Rune: RuneClient<GameState, GameActions, Persisted>
}
