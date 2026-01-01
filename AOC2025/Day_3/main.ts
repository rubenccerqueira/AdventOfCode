import * as help from '../Common/help.js';

function getJoltage(bank: string): number {
  let highestNumber = "0";
  let secondHighest = "0";

  if(bank.length < 2) {
    throw new Error("Invalid Bank")
  }

  for(let i = 0; i < bank.length - 1; i++) {
    if(bank[i] > highestNumber) {
      highestNumber = bank[i];
      secondHighest = "0";

      continue;
    }

    if(bank[i] > secondHighest) {
      secondHighest = bank[i]
    }
  }

  const lastBankEl = bank.at(-1)!;

  if(lastBankEl > secondHighest) {
    secondHighest = lastBankEl;
  }

  return Number(highestNumber + secondHighest)
}

function updateJoltNumbers(joltNumbers: string[], value: string, indexFrom: number): number {
  for(let i = indexFrom; i < joltNumbers.length; i++) {
    if(value > joltNumbers[i]) {
      joltNumbers[i] = value;
      
      if(i < 11) {
        joltNumbers[i + 1] = "0"
      }

      return i;
    }
  }

  return 12;
}

function getJoltagePart2(bank: string): number {
  if(bank.length < 12) {
    throw new Error("Invalid Bank")
  }
  
  let joltNumbers = new Array<string>(12).fill("0");
  let indexToCompare = 0;
  let needsToUpdate = false

  for(let i = 0; i < bank.length; i++) {
    if(needsToUpdate) {
      updateJoltNumbers(joltNumbers, bank[i], ++indexToCompare)
      continue;
    }

    indexToCompare = 12 + i - bank.length;

    if(indexToCompare == 0) {
      needsToUpdate = true;
    }

    updateJoltNumbers(joltNumbers, bank[i], 0)
  }

  return Number(joltNumbers.join(""))
}

export function Part1() {
  // const inp = help.readShortInputByDay(3);
  const inp = help.readInputByDay(3);

  let banks = inp.split("\n");

  let jolts = banks.map(getJoltage)

  let joltage = jolts.reduce((acc, curr) => acc + curr, 0)

  console.log("Part 1:", joltage)
}

export function Part2() {
  // const inp = help.readShortInputByDay(3);
  const inp = help.readInputByDay(3);

  let banks = inp.split("\n");

  let jolts = banks.map(getJoltagePart2)

  let joltage = jolts.reduce((acc, curr) => acc + curr, 0)

  console.log("Part 2:", joltage)
}
