import * as help from "../Common/help.js";

type Operation = "+" | "*" | "_";

const operationMapper = {
  1: "+",
  2: "*",
  99: "_",
};

let unchangedOpList: number[] = [];
let opList: number[] = [];

function doOperation(
  operation: Operation,
  ind1: number,
  ind2: number,
  storeInd: number,
) {
  let num1 = opList[ind1];
  let num2 = opList[ind2];
  let result: number = 0;

  if (operation === "*") {
    result = num1 * num2;
  } else if (operation === "+") {
    result = num1 + num2;
  }

  opList[storeInd] = result;
}

function processOpList() {
  let currIndex: number = 0;

  while (currIndex < opList.length) {
    let currOp: Operation = operationMapper[opList[currIndex]];
    if (currOp === undefined || currOp === "_") break;

    doOperation(currOp, opList[currIndex + 1], opList[currIndex + 2], opList[currIndex + 3]);

    currIndex += 4;
  }
}

function findStartingCombination(desiredTotal: number) {
  let noun = -1;
  let verb = 0;
  let maxNum = opList.length;

  do {
    noun++;
    if(noun === maxNum) {
      noun = 0;
      verb++;
    }
    
    opList = [...unchangedOpList];
    opList[1] = noun;
    opList[2] = verb;

    processOpList();
    
  } while(opList[0] !== desiredTotal && verb < maxNum);

  return 100 * noun + verb;
}

export function Part1() {
  // const inp = help.readShortInputByDay(2);
  const inp = help.readInputByDay(2);

  opList = inp.split(",").map(Number);

  processOpList();

  console.log("Part 1: ", opList[0]);
}

export function Part2() {
  // const inp = help.readShortInputByDay(2);
  const inp = help.readInputByDay(2);

  unchangedOpList = inp.split(",").map(Number);

  let result = findStartingCombination(19690720);

  console.log("Part 2: ", result);
}
