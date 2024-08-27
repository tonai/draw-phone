import { DuskClient, PlayerId } from "dusk-games-sdk";

import { DiffAction } from "./draw";

export enum Step {
  DRAW = 'draw',
  RESULTS = 'results',
  WAIT = 'wait',
  WRITE = 'write',
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
  countDown: number;
  playerIds: PlayerId[]
  playerReady: PlayerId[]
  playerRounds: PlayerRounds
  resultPlayerIndex: number
  round: number;
  startTime: number
  step: Step
}

type GameActions = {
  clear: () => void
  draw: (draw: { diff: DiffAction[], done: boolean }) => void
  write: (text: string) => void
  ready: () => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}