import * as help from "../Common/help.js";

type Direction = "U" | "D" | "L" | "R";

interface Move {
  direction: Direction;
  steps: number;
}

interface Intersection {
  coord: string;
  steps: number;
}

const mapToVector = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

function toMove(str: string): Move {
  const dir = str[0];
  const steps = Number(str.slice(1));

  return {
    direction: dir as Direction,
    steps,
  };
}

function addVector(location: number[], vector: number[]) {
  return [location[0] + vector[0], location[1] + vector[1]];
}

function processMove(
  locationsList: Map<string, number>,
  move: Move,
  currentLocation: number[],
  stepsMade: number,
) {
  const vector = mapToVector[move.direction];
  let steps = move.steps;
  let currentStepsMade = stepsMade;

  while (steps > 0) {
    const newLocation = addVector(currentLocation, vector);
    locationsList.set(
      `${newLocation[0]},${newLocation[1]}`,
      ++currentStepsMade,
    );

    steps--;
    currentLocation = newLocation;
  }

  return { currentLocation, currentStepsMade };
}

function getClosestIntersectionDistance(intersections: string[]) {
  let minDist = Number.MAX_SAFE_INTEGER;

  intersections.forEach((inter) => {
    const [a1, a2] = inter.split(",").map(Number);
    const distance = Math.abs(a1) + Math.abs(a2);

    if (distance < minDist) {
      minDist = distance;
    }
  });

  return minDist;
}

export function Part1() {
  // const inp = help.readShortInputByDay(3);
  const inp = help.readInputByDay(3);

  const [firstLine, secondLine] = inp.split("\n");

  const firstLineMoves = firstLine.split(",").map(toMove);
  const secondLineMoves = secondLine.split(",").map(toMove);

  const firstLineLocationsList = new Map<string, number>();
  const secondLineLocationsList = new Map<string, number>();

  let currentLocation = [0, 0];
  let currentSteps = 0;

  firstLineMoves.forEach((move) => {
    const result = processMove(
      firstLineLocationsList,
      move,
      currentLocation,
      currentSteps,
    );
    currentLocation = result.currentLocation;
    currentSteps = result.currentStepsMade;
  });

  currentLocation = [0, 0];
  currentSteps = 0;

  secondLineMoves.forEach((move) => {
    const result = processMove(
      secondLineLocationsList,
      move,
      currentLocation,
      currentSteps,
    );
    currentLocation = result.currentLocation;
    currentSteps = result.currentStepsMade;
  });

  const intersections: string[] = [];

  firstLineLocationsList.forEach((_, key) =>
    secondLineLocationsList.has(key) ? intersections.push(key) : null,
  );

  const result = getClosestIntersectionDistance(intersections);

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(3);
  const inp = help.readInputByDay(3);

  const [firstLine, secondLine] = inp.split("\n");

  const firstLineMoves = firstLine.split(",").map(toMove);
  const secondLineMoves = secondLine.split(",").map(toMove);

  const firstLineLocationsList = new Map<string, number>();
  const secondLineLocationsList = new Map<string, number>();

  let currentLocation = [0, 0];
  let currentSteps = 0;

  firstLineMoves.forEach((move) => {
    const result = processMove(
      firstLineLocationsList,
      move,
      currentLocation,
      currentSteps,
    );
    currentLocation = result.currentLocation;
    currentSteps = result.currentStepsMade;
  });

  currentLocation = [0, 0];
  currentSteps = 0;

  secondLineMoves.forEach((move) => {
    const result = processMove(
      secondLineLocationsList,
      move,
      currentLocation,
      currentSteps,
    );
    currentLocation = result.currentLocation;
    currentSteps = result.currentStepsMade;
  });

  const intersections: Intersection[] = [];

  firstLineLocationsList.forEach((value, key) =>
    secondLineLocationsList.has(key)
      ? intersections.push({
          coord: key,
          steps: value + secondLineLocationsList.get(key)!,
        })
      : null,
  );

  const result = intersections.reduce((acc, val) =>
    acc.steps < val.steps ? acc : val,
  );

  console.log("Part 2: ", result.steps);
}
