import { modulo } from "@tonai/game-utils/server"
import { countDowns } from "../constants"
import { GameState, Step } from "../types"

export function nextRound(game: GameState, step: Step.DRAW | Step.WRITE) {
  if (game.round === game.playerIds.length - 1) {
    // Results
    game.step = Step.RESULTS
  } else {
    // Next round
    game.round++
    game.step = step
    game.playerReady = []
    game.countDown = countDowns[step]
    game.startTime = Dusk.gameTime()
    if (step === Step.WRITE) {
      game.playerRounds[game.round] = Object.fromEntries(
        game.playerIds.map((id, i) => [
          id,
          {
            type: step,
            done: false,
            text: "",
            next:
              game.round !== game.playerIds.length - 1
                ? game.playerIds[modulo(i + 1, game.playerIds.length)]
                : undefined,
            prev: game.playerIds[modulo(i - 1, game.playerIds.length)],
          },
        ])
      )
    } else {
      game.playerRounds[game.round] = Object.fromEntries(
        game.playerIds.map((id, i) => [
          id,
          {
            type: step,
            done: false,
            dump: {},
            next:
              game.round !== game.playerIds.length - 1
                ? game.playerIds[modulo(i + 1, game.playerIds.length)]
                : undefined,
            prev: game.playerIds[modulo(i - +1, game.playerIds.length)],
          },
        ])
      )
    }
  }
}
