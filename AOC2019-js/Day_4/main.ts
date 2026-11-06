import * as help from "../Common/help.js";

const maxNumLen = 6;
let minNumber = 0;
let maxNumber = 0;

function isValidNum(num: number[]) {
  const numToValidate = Number(num.join(""));

  return numToValidate >= minNumber && numToValidate <= maxNumber;
}

function calculateValidNumber(num: number[], foundPair: boolean): number {
  if (num.length === maxNumLen) {
    if (isValidNum(num)) return 1;
    return 0;
  }

  let newNum = [...num];

  const lastDigit = num.at(-1)!;
  if (lastDigit === undefined) return 0;

  if (num.length === maxNumLen - 1 && !foundPair) {
    newNum.push(lastDigit);
    return calculateValidNumber(newNum, true);
  }

  let result = 0;

  for (let currDigit = lastDigit; currDigit <= 9; currDigit++) {
    newNum = [...num];
    newNum.push(currDigit);
    let isPair = currDigit === lastDigit;
    result += calculateValidNumber(newNum, foundPair || isPair);
  }

  return result;
}

function calculateValidNumberPart2(
  num: number[],
  consNumbers: number[],
  isFound: boolean,
): number {
  if (num.length === maxNumLen) {
    if (isValidNum(num) && isFound) {
      return 1;
    }
    return 0;
  }

  let newNum = [...num];

  const lastDigit = num.at(-1)!;
  if (lastDigit === undefined) return 0;

  if (num.length === maxNumLen - 1 && !isFound && consNumbers.length === 1) {
    newNum.push(lastDigit);
    return calculateValidNumberPart2(newNum, [...consNumbers, lastDigit], true);
  }

  let result = 0;

  for (let currDigit = lastDigit; currDigit <= 9; currDigit++) {
    newNum = [...num];
    newNum.push(currDigit);
    let isPair = consNumbers.length === 2;

    if (currDigit === lastDigit) {
      result += calculateValidNumberPart2(
        newNum,
        [...consNumbers, currDigit],
        isFound,
      );
    } else {
      result += calculateValidNumberPart2(
        newNum,
        [currDigit],
        isFound || isPair,
      );
    }
  }

  return result;
}

export function Part1() {
  // const inp = help.readShortInputByDay(4);
  const inp = help.readInputByDay(4);

  const range = inp.split("-").map(Number);
  minNumber = range[0];
  maxNumber = range[1];

  let firstDigit = 2;
  let result = 0;
  for (let currFirst = firstDigit; currFirst <= 9; currFirst++) {
    result += calculateValidNumber([currFirst], false);
  }

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(4);
  const inp = help.readInputByDay(4);

  const range = inp.split("-").map(Number);
  minNumber = range[0];
  maxNumber = range[1];

  let firstDigit = 2;
  let result = 0;
  for (let currFirst = firstDigit; currFirst <= 9; currFirst++) {
    result += calculateValidNumberPart2([currFirst], [currFirst], false);
  }

  console.log("Part 2: ", result);
}
