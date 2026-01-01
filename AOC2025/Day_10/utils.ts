export interface Machine {
  expectedState: number[],
  buttons: number[][]
}

export interface Machine2 {
  expectedJoltage: number[],
  buttons: number[][]
}

export function separateInput(input: string): string[] {
  if(input.length === 0) return []

  let splittedInput = input.trim().split(' ');
  let state = splittedInput[0];
  let buttons = splittedInput.slice(1, splittedInput.length - 1).join(' ')
  let joltage = splittedInput.at(-1)!;

  return [state, buttons, joltage]
}

export function parseExpectedState(val: string): number[] {
  let state = val.slice(1, val.length - 1);
  
  return state.split('').map(x => x === '#' ? 1 : 0)
}

export function parseButtons(val: string): number[][] {
  let buttons = val.split(' ');

  return buttons.map(x => x.slice(1, x.length - 1).split(',')).map(x => x.map(Number))
}

export function parseJoltage(val: string): number[] {
  let joltages = val.slice(1, val.length - 1);

  return joltages.split(',').map(Number);
}

export function parseToMachine(expectedState: number[], buttons: number[][]): Machine {
  return {
    expectedState,
    buttons
  }
}

export function parseToMachine2(expectedJoltage: number[], buttons: number[][]): Machine2 {
  return {
    expectedJoltage,
    buttons
  }
}
