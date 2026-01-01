import * as help from "../Common/help.js";

type Operation = "+" | "*";

function processAddition(nums: number[]) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

function processMultiplication(nums: number[]) {
  return nums.reduce((acc, curr) => acc * curr, 1);
}

function transposeLeftGrid(grid: number[][]): number[][] {
  if (grid.length < 1) return [];

  const result: number[][] = [];

  for (let column = grid[0].length - 1; column >= 0; column--) {
    let newRow: number[] = [];
    for (let row = 0; row < grid.length; row++) {
      newRow.push(grid[row][column]);
    }
    result.push(newRow);
  }

  return result;
}

function processGrid(
  numGrid: number[][],
  operationsGrid: Operation[]
): number[] {
  const result: number[] = [];

  const transposedGrid = transposeLeftGrid(numGrid);
  operationsGrid.reverse();

  for (let i = 0; i < transposedGrid.length; i++) {
    let operation = operationsGrid[i];
    let operationResult: number;
    let nums = transposedGrid[i];

    if (operation === "+") {
      operationResult = processAddition(nums);
    } else {
      operationResult = processMultiplication(nums);
    }

    result.push(operationResult);
  }

  return result;
}

// function transposeLeftGridStr(grid: string[][]): string[][] {
//   if(grid.length < 1) return [];

//   const result: string[][] = []
//   const maxColumns = grid.reduce((acc, curr) => curr.length > acc ? curr.length : acc, 0)

//   for(let column = maxColumns - 1; column >= 0; column--) {
//     let newRow: string[] = []
//     for(let row = 0; row < grid.length; row++) {
//       newRow.push(grid.at(row)?.at(column) ?? '')
//     }
//     result.push(newRow)
//   }

//   return result;
// }

function resetResult(oper: Operation) {
  return oper === "*" ? 1 : 0;
}

function processOperation(current: number, value: number, oper: Operation) {
  if (oper === "+") {
    return current + value;
  } else {
    return current * value;
  }
}

function processGridPart2(
  numGrid: string[][],
  operationsGrid: Operation[]
): number[] {
  const results = [] as number[];
  let currentOperation = 0;
  let currentResult = resetResult(operationsGrid[currentOperation]);

  for (let col = 0; col < numGrid[0].length; col++) {
    let currentNum = "";

    for (let row = 0; row < numGrid.length; row++) {
      currentNum += numGrid[row][col];
    }

    currentNum = currentNum.replaceAll(" ", "");

    if (currentNum === "") {
      results.push(currentResult);
      currentOperation++;
      currentResult = resetResult(operationsGrid[currentOperation]);
      continue;
    }

    let num = Number(currentNum);
    currentResult = processOperation(
      currentResult,
      num,
      operationsGrid[currentOperation]
    );
  }

  results.push(currentResult)

  return results;
}

export function Part1() {
  const inp = help.readShortInputByDay(6);
  // const inp = help.readInputByDay(6);

  let inpRows = inp.split("\n");

  let numGridStr = inpRows.slice(0, inpRows.length - 1);
  let operationsGrid: Operation[] = inpRows
    .at(-1)!
    .trim()
    .replace(/\s+/g, " ")
    .split(" ") as Operation[];

  let numGrid = numGridStr.map((x) =>
    x.trim().replace(/\s+/g, " ").split(" ").map(Number)
  );
  let calculationResults = processGrid(numGrid, operationsGrid ?? []);

  let result = calculationResults.reduce((acc, curr) => acc + curr, 0);

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(6);
  const inp = help.readInputByDay(6);

  let inpRows = inp.split("\n");

  let numGridStr = inpRows.slice(0, inpRows.length - 1).map((x) => x.split(""));
  let operationsGrid: Operation[] = inpRows
    .at(-1)!
    .trim()
    .replace(/\s+/g, " ")
    .split(" ") as Operation[];

  let results = processGridPart2(numGridStr, operationsGrid);

  let result = results.reduce((acc, curr) => acc + curr, 0)

  console.log("Part 2: ", result);
}
