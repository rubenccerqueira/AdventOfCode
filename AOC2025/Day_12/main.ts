import * as help from "../Common/help.js";
import * as utils from "./utils.js";

// let memo = new Map<string, boolean>();

// function resetMemo() {
//   memo = new Map<string, boolean>();
// }

function checkIfRegionFit(
  presents: utils.PresentOptimized[],
  region: utils.Region
): boolean {
  if (region.reqPresents.every((val) => val === 0)) {
    return true;
  }

  let totalCells = region.width * region.height;

  if (utils.remainingArea(region.grid, totalCells) <
      utils.requiredArea(presents, region.reqPresents)) {
    return false;
  }

  // let memoKey = region.grid.toString(36) + "|" + region.reqPresents.join(",");
  // if (memo.has(memoKey)) {
  //   return memo.get(memoKey)!;
  // }

  let presentIndex = -1;
  let minPlacements = Infinity;

  for (let i = 0; i < region.reqPresents.length; i++) {
    if (region.reqPresents[i] > 0) {
      const count = presents[i].placements.length;
      if (count < minPlacements) {
        minPlacements = count;
        presentIndex = i;
      }
    }
  }

  let present = presents[presentIndex];

  for (const placement of present.placements) {
    if((region.grid & placement.mask) !== 0n) { 
      continue;
    }

    const newMask = region.grid | placement.mask;

    const newReq = [...region.reqPresents];
    newReq[presentIndex]--;

    let canFit = checkIfRegionFit(
      presents,
      {
        grid: newMask,
        width: region.width,  
        height: region.height,
        reqPresents: newReq,
      }
    );

    if (canFit) {
      // memo.set(memoKey, true);
      return true;
    }
  }

  // memo.set(memoKey, false);
  return false;
}

export function Part1() {
  const start = new Date().getTime();
  // const inp = help.readShortInputByDay(12);
  const inp = help.readInputByDay(12);

  const [presents, regions] = utils.parseInput(inp);

  let res = regions.map((region) => {
    let presentsShapes = presents.map(present => 
      utils.generateShapes(present, region)
    );

    // resetMemo();

    return checkIfRegionFit(presentsShapes, region)
  });

  console.log("Part 1: ", res.reduce((acc, val) => acc + (val ? 1 : 0), 0));

  let elapsed = new Date().getTime() - start;
  console.log(`Elapsed time: ${elapsed} ms`);
}

export function Part2() {
  const inp = help.readShortInputByDay(12);
  // const inp = help.readInputByDay(12);

  console.log("Part 2: ", "Merry Christmas!");
}
