import * as help from '../Common/help.js';

const paper = "@"
const empty = "."

function isOutOfBounds(coordX: number, coordY: number, rowSize: number, columnSize: number): boolean {
  if(coordX < 0 || coordX >= columnSize) {
    return true;
  }
  
  if(coordY < 0 || coordY >= rowSize) {
    return true;
  }

  return false;
}

function countAdjacent(grid: string[][], coordX: number, coordY: number): number {
  if(!grid || grid.length === 0 || grid[0].length === 0) return 0;

  let paperCount = 0;

  const rowSize = grid.length;
  const columnSize = grid[0].length;

  for(let xVector = -1; xVector <= 1; xVector++) {
    for(let yVector = -1; yVector <= 1; yVector++) {
      let xToCheck = coordX + xVector;
      let yToCheck = coordY + yVector;

      if(yVector === 0 && xVector === 0) continue;

      // If out of bounds
      if(isOutOfBounds(xToCheck, yToCheck, rowSize, columnSize)) {
        continue;
      }

      if(grid[yToCheck][xToCheck] === paper) {
        paperCount++;
      }
    }
  }

  return paperCount
}

function calculateAccessibleRollsOfPaper(grid: string[][], thresholdAdjPapers = 4) {
  let resultCount = 0;

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === empty) continue;

      let adjacentPaperCount = countAdjacent(grid, j, i);

      if(adjacentPaperCount < thresholdAdjPapers) {
        resultCount++;
      }
    }
  }

  return resultCount;
}

function calculateAndRemoveAccessibleRolls(grid: string[][], thresholdAdjPapers = 4) {
  let resultCount = 0;

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if(grid[i][j] === empty) continue;

      let adjacentPaperCount = countAdjacent(grid, j, i);

      if(adjacentPaperCount < thresholdAdjPapers) {
        resultCount++;
        grid[i][j] = empty
      }
    }
  }

  return resultCount;
}

function calculateAndKeepRemovingPaper(grid: string[][], thresholdAdjPapers = 4) {
  let count = 0;

  let result = -1

  while(result !== 0) {
    result = calculateAndRemoveAccessibleRolls(grid, thresholdAdjPapers);

    count += result;
  }

  return count;
}

export function Part1() {
  // const inp = help.readShortInputByDay(4);
  const inp = help.readInputByDay(4);

  var grid = inp.split("\n").map(x => x.trim().split(''))

  var accessibleRolls = calculateAccessibleRollsOfPaper(grid, 4)

  console.log("Part 1:", accessibleRolls)
}

export function Part2() {
  // const inp = help.readShortInputByDay(4);
  const inp = help.readInputByDay(4);

  var grid = inp.split("\n").map(x => x.trim().split(''))

  var accessibleRolls = calculateAndKeepRemovingPaper(grid, 4)

  console.log("Part 2:", accessibleRolls)
}
