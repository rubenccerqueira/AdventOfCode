import * as help from "../Common/help.js";

interface Range {
  min: number;
  max: number;
}

function parseRange(s: string): Range {
  let values = s.trim().split("-");

  if (values.length != 2) {
    throw new Error(`Invalid direction range string`);
  }

  return { min: Number(values[0]), max: Number(values[1]) };
}

function checkForInvalidIdsInRange(range: Range): number[] {
  let currValue = range.min;

  let invalidIds = [] as number[];

  while (currValue <= range.max) {
    let strValue = String(currValue);

    if (strValue.length % 2 == 0) {
      let halfPosition = strValue.length / 2;

      let firstHalf = strValue.substring(0, halfPosition);
      let lastHalf = strValue.substring(halfPosition);

      if (firstHalf === lastHalf) {
        invalidIds.push(currValue);
      }
    }

    currValue++;
  }

  return invalidIds;
}

function checkSequenceLengthForNumber(
  strValue: string,
  sequenceLength: number
): boolean {
  for (
    let curr = sequenceLength;
    curr < strValue.length;
    curr += sequenceLength
  ) {
    let firstSequence = strValue.substring(curr - sequenceLength, curr);

    let secondSequence = strValue.substring(curr, curr + sequenceLength);

    if (firstSequence !== secondSequence) {
      return false;
    }
  }

  return true;
}

function checkNumberForInvalidnessPart2(strValue: string): boolean {
  let sequenceLength = Math.floor(strValue.length / 2);

  for (; sequenceLength > 0; sequenceLength--) {
    let areThereEnoughCombinations = strValue.length % sequenceLength == 0;

    if (!areThereEnoughCombinations) {
      // If we can have the same combination repeated n times inside the string
      continue;
    }

    var isInvalidId = checkSequenceLengthForNumber(strValue, sequenceLength);

    if (isInvalidId) {
      return true;
    }
  }

  return false;
}

function checkForInvalidIdsInRangePart2(range: Range): number[] {
  let currValue = range.min;

  let invalidIds = [] as number[];

  while (currValue <= range.max) {
    let strValue = String(currValue);

    // Get the max value possible that is, which is splitting the number in half
    let isInvalidId = checkNumberForInvalidnessPart2(strValue);

    if (isInvalidId) {
      invalidIds.push(currValue);
    }

    currValue++;
  }

  return invalidIds;
}

export function Part1() {
  // const inp = help.readShortInputByDay(2);
  const inp = help.readInputByDay(2);

  var ranges = inp.replace(/[\n ]/g, "").split(",").map(parseRange);

  let invalidIds = ranges.flatMap(checkForInvalidIdsInRange);

  let result = invalidIds.reduce((acc, curr) => acc + curr, 0);

  console.log("Part 1:", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(2);
  const inp = help.readInputByDay(2);

  var ranges = inp.replace(/[\n ]/g, "").split(",").map(parseRange);

  let invalidIds = ranges.flatMap(checkForInvalidIdsInRangePart2);

  let result = invalidIds.reduce((acc, curr) => acc + curr, 0);

  console.log("Part 2:", result);
}
