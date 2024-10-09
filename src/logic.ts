import { votesArray } from "@tonai/game-utils/server"
import { countDowns } from "./constants"
import { nextRound } from "./logic/rounds"
import { Action, DrawRound, Mode, Step, WriteRound } from "./types"

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 6,
  persistPlayerData: true,
  reactive: true,
  updatesPerSecond: 10,
  setup: (allPlayerIds) => ({
    countDown: 0,
    mode: Mode.CLASSIC,
    playerIds: allPlayerIds,
    playerReady: [],
    playerRounds: [],
    round: -1,
    startTime: 0,
    step: Step.WAIT,
    votes: {},
  }),
  actions: {
    clear(_, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Rune.invalidAction()
      }
      const playerRound = game.playerRounds[game.round][playerId] as DrawRound
      playerRound.dump = {}
    },
    draw({ diff, done, enabled }, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Rune.invalidAction()
      }
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
        if (!enabled && !game.playerReady.includes(playerId)) {
          game.playerReady.push(playerId)
        } else if (enabled && game.playerReady.includes(playerId)) {
          const index = game.playerReady.indexOf(playerId)
          game.playerReady.splice(index, 1)
          playerRound.done = false
        }
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
    gameOver(_, { allPlayerIds }) {
      Rune.gameOver({
        minimizePopUp: true,
        players: Object.fromEntries(allPlayerIds.map((id) => [id, "WON"])),
      })
    },
    ready(vote: Mode, { game, playerId }) {
      if (game.step !== Step.WAIT) {
        return Rune.invalidAction()
      }
      if (game.votes[playerId] === vote) {
        game.votes[playerId] = undefined
      } else {
        game.votes[playerId] = vote
      }
      const votes = Object.values(game.votes).filter((mode) => mode) as Mode[]
      if (votes.length === game.playerIds.length) {
        game.mode = votesArray(votes)
        nextRound(game, Step.WRITE)
      }
    },
    selectLocale(locale: string, { game, playerId }) {
      game.persisted[playerId].locale = locale
    },
    write({ enabled, text }, { game, playerId }) {
      if (game.step !== Step.WRITE) {
        return Rune.invalidAction()
      }
      const playerRound = game.playerRounds[game.round][playerId] as WriteRound
      playerRound.text = text
      playerRound.done = true
      if (!enabled && !game.playerReady.includes(playerId)) {
        game.playerReady.push(playerId)
      } else if (enabled && game.playerReady.includes(playerId)) {
        const index = game.playerReady.indexOf(playerId)
        game.playerReady.splice(index, 1)
        playerRound.done = false
      }
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
        (countDowns[game.step] * 1000 - (Rune.gameTime() - game.startTime)) /
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
