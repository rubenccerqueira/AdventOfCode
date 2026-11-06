import * as help from '../Common/help.js';
import * as helper from './helper.js';

function processOpList(opList: number[]): number {
  let currIndex = 0;

  while (currIndex < opList.length && currIndex !== -1) {
    const command = helper.getCommandFromCode(opList[currIndex]);
    currIndex = command.processCommand(opList, currIndex);
  }

  return opList[0];
}

export function Part1() {
  // const inp = help.readShortInputByDay(5);
  const inp = help.readInputByDay(5);

  const opList = inp.split(',').map(Number);
  const res = processOpList(opList);

  console.log("Part 1: ", res);
}

export function Part2() {
  // const inp = help.readShortInputByDay(5);
  const inp = help.readInputByDay(5);

  const opList = inp.split(',').map(Number);
  const res = processOpList(opList);

  console.log("Part 2: ", res);
}
