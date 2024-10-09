import type { DiffAction } from "../types"

import { Action } from "../types"

export function getDiff(
  playerId: string,
  prevNodes: SVGElement[],
  lastNodes: SVGElement[],
  prevDump: string[],
  lastDump: string[]
): DiffAction[] {
  if (lastNodes.length === 0 && prevNodes.length === 0) {
    return []
  }
  const diff: DiffAction[] = []
  const all = [...new Set(prevNodes.concat(lastNodes))]
  for (const node of all) {
    const prevIndex = prevNodes.indexOf(node)
    const lastIndex = lastNodes.indexOf(node)
    // Update
    if (prevIndex === lastIndex) {
      if (
        prevDump[prevIndex] !== lastDump[lastIndex] &&
        node.dataset.id === playerId
      ) {
        diff.push([
          Action.UPDATE,
          node.dataset.time ?? "",
          node.dataset.id,
          node.outerHTML,
        ])
      }
      continue
    }
    // Deleted item
    if (lastIndex === -1) {
      diff.push([Action.DELETE, node.dataset.time ?? "", node.dataset.id ?? ""])
      continue
    }
    // New item
    if (prevIndex === -1 && node.dataset.id === playerId) {
      diff.push([
        Action.ADD,
        node.dataset.time ?? "",
        node.dataset.id,
        node.outerHTML,
      ])
      continue
    }
  }
  return diff
}

export function clear(
  lastNodes: SVGElement[],
  lastDump: string[],
  drauu?: { clear: () => void }
): void {
  if (drauu) {
    drauu.clear()
  }
  lastNodes.splice(0, lastNodes.length)
  lastDump.splice(0, lastDump.length)
}
