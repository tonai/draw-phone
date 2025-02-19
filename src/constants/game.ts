import { Mode } from "../types"

export const countDowns = { write: 30, draw: 90 }

export const descriptions = {
  [Mode.CLASSIC]:
    "Take turns alternating between writing and drawing. Best enjoyed with a large group.",
  [Mode.SECRET]:
    "Similar to Classic Mode, but you can barely see what you're writing or drawing.",
  [Mode.BG]:
    "First, draw the background, then create at least four animation frames on top of it. Ideal for 2 or 3 players.",
}
