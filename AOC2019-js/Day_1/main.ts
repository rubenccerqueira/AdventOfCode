import * as help from "../Common/help.js";

function calculateFuel(number: number) {
  return Math.floor(number / 3) - 2;
}

function calculateFuelV2(number: number) {
  let currNumber = number;
  let res = -currNumber;
  while(currNumber > 0) {
    res += currNumber;
    currNumber = calculateFuel(currNumber);
  }

  return res;
} 

export function Part1() {
  // const inp = help.readShortInputByDay(1);
  const inp = help.readInputByDay(1);

  const result = inp
    .split("\n")
    .map(Number)
    .map(calculateFuel)
    .reduce((acc, val) => acc + val, 0);

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(1);
  const inp = help.readInputByDay(1);

  const result = inp
    .split("\n")
    .map(Number)
    .map(calculateFuelV2)
    .reduce((acc, val) => acc + val, 0);

  console.log("Part 2: ", result);
}
