import { modulo } from "@tonai/game-utils/server"
import { countDowns } from "../constants"
import { GameState, Mode, Step } from "../types"

export function nextRound(game: GameState, step: Step.DRAW | Step.WRITE) {
  const totalRounds =
    game.mode === Mode.BG
      ? Math.max(game.playerIds.length - 1, 4)
      : game.playerIds.length - 1
  // Only draw for background mode
  if (game.mode === Mode.BG) {
    step = Step.DRAW
  }
  if (game.playerIds.length < game.startPlayerIds.length) {
    // Not enough players to start a new round
    game.step = Step.RESULTS
  } else if (game.round >= totalRounds) {
    // Results
    game.step = Step.RESULTS
  } else {
    // Next round
    game.round++
    game.step = step
    game.playerReady = []
    game.countDown = countDowns[step]
    game.startTime = Rune.gameTime()
    if (step === Step.WRITE) {
      game.playerRounds[game.round] = Object.fromEntries(
        game.playerIds.map((id, i) => {
          return [
            id,
            {
              type: step,
              done: false,
              text: "",
              next:
                game.round !== totalRounds
                  ? game.playerIds[modulo(i + 1, game.playerIds.length)]
                  : undefined,
              prev: game.playerIds[modulo(i - 1, game.playerIds.length)],
            },
          ]
        })
      )
    } else {
      game.playerRounds[game.round] = Object.fromEntries(
        game.playerIds.map((id, i) => {
          return [
            id,
            {
              type: step,
              done: false,
              dump: {},
              next:
                game.round !== totalRounds
                  ? game.playerIds[modulo(i + 1, game.playerIds.length)]
                  : undefined,
              prev: game.playerIds[modulo(i - +1, game.playerIds.length)],
            },
          ]
        })
      )
    }
  }
}
