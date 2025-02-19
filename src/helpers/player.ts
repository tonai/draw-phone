import { Player } from "rune-sdk"

import { newPlayerIdMap } from "../store"

const defaultPlayer = { displayName: "Anonymous", avatarUrl: "" }

export function getPlayer(id?: string): Omit<Player, "playerId"> {
  if (!id) {
    return defaultPlayer
  }
  try {
    return Rune.getPlayerInfo(newPlayerIdMap.value[id] ?? id)
  } catch (_) {
    return defaultPlayer
  }
}
