import { generateId, votesArray } from "@tonai/game-utils/server"
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
    countDown: 0, // countdown for write or draw phases
    id: generateId(), // Global session id
    mode: Mode.CLASSIC, // game mode, either Classic or Secret
    playerIds: allPlayerIds, // array of player IDs (we store player IDs that were here at the start)
    playerIdMap: {}, // map player IDs to their previous player ID (after leaving and joining back)
    playerReady: [], // array of players who finish to draw or write
    playerRounds: [], // store the players drawing or writing for each round
    round: -1, // current round number
    startPlayerIds: [], // Array of player IDs present for the first round
    startTime: 0, // start time for the current round (used to calculate countdown)
    step: Step.WAIT, // current game step (wait, draw, write, results)
    votes: {}, // votes for the mode selection
  }),
  actions: {
    clear(_, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Rune.invalidAction()
      }
      playerId = game.playerIdMap[playerId] || playerId
      const playerRound = game.playerRounds[game.round][playerId] as DrawRound
      playerRound.dump = {}
    },
    draw({ diff, done, enabled }, { game, playerId }) {
      if (game.step !== Step.DRAW) {
        return Rune.invalidAction()
      }
      playerId = game.playerIdMap[playerId] || playerId
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
        if (game.playerReady.length === game.playerIds.length) {
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
      game.persisted[playerId].gameId = game.id
      game.persisted[playerId].prevPlayerId = playerId
      if (game.votes[playerId] === vote) {
        game.votes[playerId] = undefined
      } else {
        game.votes[playerId] = vote
      }
      const votes = Object.values(game.votes).filter((mode) => mode) as Mode[]
      if (votes.length === game.playerIds.length) {
        game.mode = votesArray(votes)
        game.startPlayerIds = [...game.playerIds]
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
      playerId = game.playerIdMap[playerId] || playerId
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
      if (game.playerReady.length === game.playerIds.length) {
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
        game.playerIds.push(game.playerIdMap[playerId] ?? playerId)
      } else if (
        game.persisted[playerId].gameId === game.id &&
        game.step !== Step.RESULTS
      ) {
        const prevPlayerId = game.persisted[playerId].prevPlayerId!
        if (game.startPlayerIds.includes(prevPlayerId)) {
          // Join back after leaving
          game.playerIdMap[playerId] = prevPlayerId
          const reversedMap = Object.fromEntries(
            Object.entries(game.playerIdMap).map(([id, prevId]) => [prevId, id])
          )
          game.playerIds = game.startPlayerIds.filter(
            (id) =>
              game.playerIds.includes(id) ||
              game.playerIds.includes(reversedMap[id]) ||
              id === prevPlayerId
          )
        }
      }
      // Else is spectator
    },
    playerLeft(playerId, { game }) {
      const prevPlayerId = game.playerIdMap[playerId] ?? playerId
      game.playerIds.splice(game.playerIds.indexOf(prevPlayerId), 1)
      if (game.playerReady.includes(playerId)) {
        game.playerReady.splice(game.playerReady.indexOf(playerId), 1)
      }
      if (game.playerReady.includes(prevPlayerId)) {
        game.playerReady.splice(game.playerReady.indexOf(prevPlayerId), 1)
      }
      // This is not useless but anyway...
      delete game.votes[playerId]
      // If all remaining players are ready, start next run
      if (game.playerReady.length === game.playerIds.length) {
        nextRound(game, game.step === Step.DRAW ? Step.WRITE : Step.DRAW)
      }
    },
  },
})
