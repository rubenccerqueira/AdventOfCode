import * as help from "../Common/help.js";
import * as utils from "./utils.js";
import solver from 'javascript-lp-solver';

interface QueueUnit {
  state: number[];
  clicks: number;
}

interface StackUnit2 {
  idx: number;
  joltage: number[];
  clicks: number;
}

function checkIfStateIsExpected(
  machine: utils.Machine,
  state: number[]
): boolean {
  let expectedState = machine.expectedState;

  if (expectedState.length !== state.length) return false;

  for (let i = 0; i < state.length; i++) {
    if (expectedState[i] !== state[i]) return false;
  }

  return true;
}

function applyButtonToState(state: number[], button: number[]): number[] {
  let newState = Array.from(state);

  for (const index of button) {
    newState[index] = (newState[index] + 1) % 2;
  }

  return newState;
}

function getFewestClicks(machine: utils.Machine): number {
  let queue = [] as QueueUnit[];
  let visited = new Set<string>();
  visited.add(machine.expectedState.join(""));
  const initialState = Array.from(
    { length: machine.expectedState.length },
    () => 0
  );

  for (const button of machine.buttons) {
    let newState = applyButtonToState(initialState, button);

    if (checkIfStateIsExpected(machine, newState)) {
      return 1;
    }

    queue.push({ state: newState, clicks: 1 });
  }

  while (queue.length > 0) {
    let [item] = queue.splice(0, 1);

    if (visited.has(item.state.join(""))) {
      continue;
    }

    visited.add(item.state.join(""));

    for (const button of machine.buttons) {
      let newState = applyButtonToState(item.state, button);

      if (checkIfStateIsExpected(machine, newState)) {
        return item.clicks + 1;
      }

      queue.push({ state: newState, clicks: item.clicks + 1 });
    }
  }

  return 0;
}

function checkIfJoltageIsExpected(joltage: number[]): boolean {
  return joltage.every((x) => x === 0);
}

function applyButtonToJoltage(joltage: number[], button: number[]): number[] {
  let newjoltage = Array.from(joltage);

  for (const index of button) {
    newjoltage[index]--;
  }

  return newjoltage;
}

function getFewestClicks2(machine: utils.Machine2): number {
  const { expectedJoltage, buttons } = machine;
  const nCounters = expectedJoltage.length;
  const nButtons = buttons.length;

  // Build the model
  const model: any = {
    optimize: "clicks",
    opType: "min",
    constraints: {},
    variables: {},
    ints: {}
  };

  // For each counter, we'll force equality
  for (let i = 0; i < nCounters; i++) {
    model.constraints[`counter${i}`] = { equal: expectedJoltage[i] };
  }

  // Construct variables
  for (let j = 0; j < nButtons; j++) {
    const varName = `x${j}`;
    const button = buttons[j];

    // Click count of this variable
    model.variables[varName] = { clicks: 1 };

    // Each constraint it affects contributes a +1 coefficient
    for (const counterIdx of button) {
      model.variables[varName][`counter${counterIdx}`] =
        (model.variables[varName][`counter${counterIdx}`] || 0) + 1;
    }

    // Mark it as integer
    model.ints[varName] = 1;
  }

  // Solve
  const results = solver.Solve(model);

  if (!results.feasible) {
    throw new Error("No solution found!");
  }

  // `result` is the minimized objective value
  return results.result;
}



export function Part1() {
  // const inp = help.readShortInputByDay(10);
  const inp = help.readInputByDay(10);

  const inpLines = inp.split("\n").map(utils.separateInput);

  let machines = inpLines.map(([expStateStr, buttonStr, _]) => {
    let expectedState = utils.parseExpectedState(expStateStr);
    let buttons = utils.parseButtons(buttonStr);
    return utils.parseToMachine(expectedState, buttons);
  });

  let clicks = machines.map(getFewestClicks);

  console.log(
    "Part 1: ",
    clicks.reduce((a, b) => a + b, 0)
  );
}

export function Part2() {
  // const inp = help.readShortInputByDay(10);
  const inp = help.readInputByDay(10);

  const inpLines = inp.split("\n").map(utils.separateInput);

  let machines = inpLines.map(([_, buttonStr, expJoltageStr]) => {
    let expectedJoltage = utils.parseJoltage(expJoltageStr);
    let buttons = utils.parseButtons(buttonStr);
    return utils.parseToMachine2(expectedJoltage, buttons);
  });

  let clicks = machines.map(getFewestClicks2);

  console.log(
    "Part 2: ",
    clicks.reduce((a, b) => a + b, 0)
  );
}
