import * as help from "../Common/help.js";

interface Range {
  min: number;
  max: number;
}

function isNumInsideRange(num: number, ranges: Range[]) {
  return ranges.some((range) => num >= range.min && num <= range.max);
}

function parseToRange(value: string): Range {
  let numValues = value.split("-");

  return {
    min: Number(numValues[0]),
    max: Number(numValues[1]),
  };
}

function convertRangesToNums(range: Range): number {
  return range.max - range.min + 1;
}

function areRangesMergeable(fstRange: Range, scdRange: Range): boolean {
  if (fstRange.max < scdRange.min) {
    return false;
  }

  if (fstRange.min > scdRange.max) {
    return false;
  }

  return true;
}

function mergeTwoRanges(fstRange: Range, scdRange: Range): Range {
  return {
    min: Math.min(fstRange.min, scdRange.min),
    max: Math.max(fstRange.max, scdRange.max),
  };
}

function mergeRanges(ranges: Range[]): Range[] {
  ranges.sort((a, b) => a.min - b.min);

  for (let i = 0; i < ranges.length - 1; ) {
    let currRange = ranges[i];

    let secRange = ranges[i + 1];

    if (areRangesMergeable(currRange, secRange)) {
      currRange = ranges[i] = mergeTwoRanges(currRange, secRange);

      ranges.splice(i + 1, 1); // Remove

      continue;
    }

    i++;
  }

  return ranges;
}

export function Part1() {
  // const inp = help.readShortInputByDay(5);
  const inp = help.readInputByDay(5);

  const [rangesStr, numsStr] = inp.split("\n\n");

  const ranges = rangesStr
    .split("\n")
    .map((x) => x.trim())
    .map(parseToRange);
  const nums = numsStr.split("\n").map((x) => Number(x.trim()));

  const numInsideRangeCount = nums.reduce((val, curr) => {
    if (isNumInsideRange(curr, ranges)) {
      return val + 1;
    }

    return val;
  }, 0);

  console.log("Part 1: ", numInsideRangeCount);
}

export function Part2() {
  // const inp = help.readShortInputByDay(5);
  const inp = help.readInputByDay(5);

  const [rangesStr, _] = inp.split("\n\n");

  let ranges = rangesStr
    .split("\n")
    .map((x) => x.trim())
    .map(parseToRange);

  const resultNums = mergeRanges(ranges)
    .map(convertRangesToNums)
    .reduce((acc, curr) => acc + curr, 0);

  console.log("Part 2: ", resultNums);
}
