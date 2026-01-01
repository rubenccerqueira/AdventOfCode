import * as help from '../Common/help.js';

const splitter = '^'
const empty = '.'
const memo: Map<string, number> = new Map()

function getUsedSplittersCount(grid: string[][], startingColumn: number): number {
  const beamColumns = new Set([startingColumn])
  let count = 0;

  for(let row = 2; row < grid.length; row += 2) {
    let beamsToAdd: number[] = []
    let beamsToRemove: number[] = [];

    beamColumns.forEach(col => {
      if(grid[row][col] === empty) return;

      count++;
      beamsToAdd.push(col + 1)
      beamsToAdd.push(col - 1)
      beamsToRemove.push(col)
    })

    beamsToRemove.forEach(beam => beamColumns.delete(beam))
    beamsToAdd.forEach(beam => beamColumns.add(beam))
  }

  return count;
}

function getPossibleTimelinesRow(grid: string[][], column: number, row: number): number {
  if(row >= grid.length) return 1;

  let memoKey = [row, column].join(',')
  let memoValue = memo.get(memoKey)

  if(memoValue) {
    return memoValue
  }

  let count = 0;

  if(grid[row][column] === splitter) {
    count = getPossibleTimelinesRow(grid, column - 1, row + 2) 
      + getPossibleTimelinesRow(grid, column + 1, row + 2)

    memo.set(memoKey, count)

    return count;
  }

  count = getPossibleTimelinesRow(grid, column, row + 2);

  memo.set(memoKey, count)

  return count;
}

function getPossibleTimelines(grid: string[][], startingColumn: number): number {
  return getPossibleTimelinesRow(grid, startingColumn, 2);
}

export function Part1() {
  // const inp = help.readShortInputByDay(7);
  const inp = help.readInputByDay(7);

  const grid = inp.split('\n').map(x => x.trim().split(''));
  const startingColumn = grid[0].indexOf('S')

  const result = getUsedSplittersCount(grid, startingColumn);

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(7);
  const inp = help.readInputByDay(7);

  const grid = inp.split('\n').map(x => x.trim().split(''));
  const startingColumn = grid[0].indexOf('S')

  const result = getPossibleTimelines(grid, startingColumn);

  console.log("Part 2: ", result);
}

