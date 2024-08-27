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
      diff.push([
        Action.DELETE,
        node.dataset.time ?? "",
        node.dataset.id ?? "",
      ])
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

// export function moveSvg(
//   svg: SVGSVGElement,
//   item: SVGElement,
//   nodes: SVGElement[],
//   dumps: string[],
// ): void {
//   nodes.push(item);
//   dumps.push(item.outerHTML);
//   svg.append(item);
// }

// export function createSvg(
//   svg: SVGSVGElement,
//   tmp: SVGSVGElement,
//   diffAction: IAddAction,
//   nodes: SVGElement[],
//   dumps: string[],
// ): void {
//   const [, , , , dump] = diffAction;
//   tmp.innerHTML = dump;
//   const item = tmp.children[0];
//   if (item instanceof SVGElement && item.dataset.committed === "1") {
//     moveSvg(svg, item, nodes, dumps);
//   }
// }

// export function createAndMoveSvg(
//   svg: SVGSVGElement,
//   tmp: SVGSVGElement,
//   diffAction: IAddAction,
//   nodes: SVGElement[],
//   dumps: string[],
// ): void {
//   const [, , , , dump] = diffAction;
//   tmp.innerHTML = dump;
//   const item = tmp.children[0];
//   if (item instanceof SVGElement) {
//     moveSvg(svg, item, nodes, dumps);
//   }
// }

// export function updateSvg(
//   svg: SVGSVGElement,
//   tmp: SVGSVGElement,
//   diffAction: IUpdateAction,
//   nodes: SVGElement[],
//   dumps: string[],
// ): void {
//   const [, , time, id, dump] = diffAction;
//   tmp.innerHTML = dump;
//   const item = [...tmp.children].find(
//     (el) =>
//       el instanceof SVGElement &&
//       el.dataset.id === id &&
//       el.dataset.time === time,
//   );
//   if (item && item instanceof SVGElement && item.dataset.committed === "1") {
//     moveSvg(svg, item, nodes, dumps);
//   }
// }

// export function removeSvg(
//   svg: SVGSVGElement,
//   diffAction: IDeleteAction,
//   nodes: SVGElement[],
//   dumps: string[],
// ): void {
//   const [, , time, id] = diffAction;
//   const item = [...svg.children].find((el) => {
//     return (
//       el instanceof SVGElement &&
//       el.dataset.id === id &&
//       el.dataset.time === time
//     );
//   });
//   if (item) {
//     const index = nodes.indexOf(item as SVGElement);
//     nodes.splice(index, 1);
//     dumps.splice(index, 1);
//     item.remove();
//   }
// }

export function clear(
  tmp: SVGSVGElement,
  lastNodes: SVGElement[],
  lastDump: string[],
  drauu?: { clear: () => void },
): void {
  if (drauu) {
    drauu.clear();
  }
  tmp.innerHTML = "";
  lastNodes.splice(0, lastNodes.length);
  lastDump.splice(0, lastDump.length);
}

// export function draw(
//   playerId: string,
//   svg: SVGSVGElement,
//   tmp: SVGSVGElement,
//   drawDiff: Record<string, IDiffAction[]>,
//   lastTime: Record<string, number>,
//   lastNodes: SVGElement[],
//   lastDump: string[],
//   drauu?: { clear: () => void },
// ): void {
//   const entries = Object.entries(drawDiff);
//   for (const [id, actions] of entries) {
//     let nextTime = 0;
//     for (const diffAction of actions) {
//       const [time, action] = diffAction;
//       if (lastTime[id] && time <= lastTime[id]) {
//         continue;
//       }
//       switch (action) {
//         case Action.CLEAR: {
//           clear(tmp, lastNodes, lastDump, drauu);
//           break;
//         }
//         case Action.ADD: {
//           if (id !== playerId) {
//             createSvg(svg, tmp, diffAction, lastNodes, lastDump);
//           }
//           break;
//         }
//         case Action.UPDATE: {
//           if (id !== playerId) {
//             updateSvg(svg, tmp, diffAction, lastNodes, lastDump);
//           }
//           break;
//         }
//         case Action.DELETE: {
//           removeSvg(svg, diffAction, lastNodes, lastDump);
//           removeSvg(tmp, diffAction, lastNodes, lastDump);
//           break;
//         }
//       }
//       nextTime = Math.max(nextTime, time);
//     }
//     lastTime[id] = Math.max(lastTime[id] || 0, nextTime);
//   }
// }

// export function load(
//   svg: SVGSVGElement,
//   tmp: SVGSVGElement,
//   lastNodes: SVGElement[],
//   lastDump: string[],
//   drawDump: Record<string, Record<string, { dump: string; time: number }>>,
// ): void {
//   const dumps = Object.entries(drawDump)
//     .reduce<{ dump: string; id: string; time: number }[]>(
//       (acc, [id, dumps]) =>
//         acc.concat(
//           Object.entries(dumps).map(([time, dump]) => ({
//             ...dump,
//             id,
//             time: Number(time),
//           })),
//         ),
//       [],
//     )
//     .sort((a, b) => a.time - b.time);
//   for (const playerDump of dumps) {
//     const { dump, id, time } = playerDump;
//     createAndMoveSvg(
//       svg,
//       tmp,
//       [time, Action.ADD, String(time), String(id), dump],
//       lastNodes,
//       lastDump,
//     );
//   }
// }
