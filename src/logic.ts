import { countDowns } from "./constants"
import { nextRound } from "./logic/rounds"
import { Action, DiffAction, DrawRound, Step, WriteRound } from "./types"

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 6,
  reactive: true,
  updatesPerSecond: 10,
  setup: (allPlayerIds) => ({
    countDown: 0,
    playerIds: allPlayerIds,
    playerReady: [],
    playerRounds: [],
    resultPlayerIndex: 0,
    round: -1,
    startTime: 0,
    step: Step.WAIT,
  }),
  actions: {
    clear(_, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Dusk.invalidAction()
      }
      const playerRound = game.playerRounds[game.round][playerId] as DrawRound
      playerRound.dump = {}
    },
    draw(draw: { diff: DiffAction[]; done: boolean }, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Dusk.invalidAction()
      }
      const { diff, done } = draw
      const playerRound = game.playerRounds[game.round][playerId] as DrawRound
      for (const [action, timeId, , dump] of diff) {
        switch (action) {
          case Action.DELETE:
            delete playerRound.dump[timeId]
            break

          case Action.ADD:
          case Action.UPDATE:
            if (timeId) {
              playerRound.dump[timeId] = dump
            }
            break
        }
      }
      if (done) {
        playerRound.done = true
        if (
          Object.values(game.playerRounds[game.round]).filter(
            (round) => (round as DrawRound).done
          ).length === game.playerIds.length
        ) {
          // Next round
          nextRound(game, Step.WRITE)
        }
      }
    },
    ready(_, { game, playerId }) {
      if (game.step !== Step.WAIT || game.playerReady.includes(playerId)) {
        return Dusk.invalidAction()
      }
      game.playerReady.push(playerId)
      if (game.playerReady.length === game.playerIds.length) {
        // Start writing first idea
        nextRound(game, Step.WRITE)
      }
    },
    write(text, { game, playerId }) {
      if (game.step !== Step.WRITE) {
        return Dusk.invalidAction()
      }
      const playerRound = game.playerRounds[game.round][playerId] as WriteRound
      playerRound.text = text
      playerRound.done = true
      if (
        Object.values(game.playerRounds[game.round]).filter(
          (round) => (round as DrawRound).done
        ).length === game.playerIds.length
      ) {
        // Next round
        nextRound(game, Step.DRAW)
      }
    },
  },
  update({ game }) {
    if (game.step === Step.WRITE || game.step === Step.DRAW) {
      const countDown =
        (countDowns[game.step] * 1000 - (Dusk.gameTime() - game.startTime)) /
        1000
      game.countDown = Math.max(countDown, 0)
    }
  },
  events: {
    playerJoined(playerId, { game }) {
      if (game.step === Step.WAIT) {
        game.playerIds.push(playerId)
      } else {
        // Spectator (TODO)
      }
    },
    playerLeft(playerId, { game }) {
      if (game.step === Step.WAIT) {
        game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      } else {
        // If a player left during the game (TODO)
      }
    },
  },
})
