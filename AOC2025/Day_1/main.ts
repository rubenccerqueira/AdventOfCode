import * as help from "../Common/help";

interface Command {
  direction: "L" | "R";
  steps: number;
}

function modulusBy100(n: number): number {
  return ((n % 100) + 100) % 100;
}

function transformToCommand(val: string): Command {
  var direction = val[0];

  if (direction !== "L" && direction !== "R") {
    throw new Error(`Invalid direction: ${direction}`);
  }

  var steps = Number.parseInt(val.slice(1));

  return { direction, steps };
}

function executeCommand(comm: Command, currentValue: number): number {
  if (comm.direction === "L") {
    currentValue -= comm.steps;
  }

  if (comm.direction === "R") {
    currentValue += comm.steps;
  }

  return currentValue;
}

function getTimesPassedThroughZero(
  curr: number,
  newValue: number,
  divisor: number
): number {
  if (curr === newValue) return 0; // No change

  if (newValue === 0) return 1; // Directly to zero

  var times = 0;

  if (curr > 0 && newValue < 0) {
    times++; // Passed through zero once
  }

  times += Math.floor(Math.abs(newValue) / divisor); // Full cycles through zero

  return times;
}

export function Part1() {
  // let inp = help.readShortInputByDay(1)
  const inp = help.readInputByDay(1);

  const values = inp
    .split("\n")
    .map((x) => x.trim())
    .map(transformToCommand);

  var currentValue = 50;
  var zeroCount = 0;

  values.forEach((x) => {
    currentValue = executeCommand(x, currentValue);

    currentValue = modulusBy100(currentValue);

    if (currentValue == 0) {
      zeroCount++;
    }
  });

  console.log("Part 1: ", zeroCount);
}

export function Part2() {
  // let inp = help.readShortInputByDay(1);
  const inp = help.readInputByDay(1);

  const values = inp
    .split("\n")
    .map((x) => x.trim())
    .map(transformToCommand);

  var currentValue = 50;
  var zeroCount = 0;

  values.forEach((x) => {
    var newValue = executeCommand(x, currentValue);

    zeroCount += getTimesPassedThroughZero(currentValue, newValue, 100);

    currentValue = modulusBy100(newValue);
  });

  console.log("Part 2: ", zeroCount);
}
