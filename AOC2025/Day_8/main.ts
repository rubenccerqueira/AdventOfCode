import * as help from "../Common/help.js";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Distance {
  value: number;
  point1: number;
  point2: number;
}

function DFSearchCount(graph: number[][], pointNum: number, visited: Set<number>): number {
  if(visited.has(pointNum)) return 0;

  visited.add(pointNum)

  const nextPoints = graph[pointNum]

  return 1 + nextPoints.reduce((acc, curr) => acc + DFSearchCount(graph, curr, visited), 0);
}

function countCircuitLengths(graph: number[][], pointsCount: number): number[] {
  const notVisited = new Set(Array.from({ length: pointsCount }, (_, i) => i));
  let visited = new Set<number>();
  const result: number[] = []

  while(notVisited.size > 0) {
    let point = notVisited.keys().next().value!
    notVisited.delete(point);

    let count = DFSearchCount(graph, point, visited)

    result.push(count);

    visited.forEach(x => notVisited.delete(x))
    visited = new Set<number>();
  }

  return result;
}

function createGraph(distances: Distance[], pointCount: number, numConnections: number): number[][] {
  let graph: number[][] = Array.from({ length: pointCount }, () => [])

  let maxIterations = Math.min(numConnections, distances.length)

  for(let i = 0; i < maxIterations; i++) {
    let distance = distances[i];
    graph[distance.point1].push(distance.point2)
    graph[distance.point2].push(distance.point1)
  }

  return graph;
}

function calculateDistances(points: Point3D[]): Distance[] {
  const distances = [] as Distance[];

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let distance = computeDistance(points[i], points[j]);

      let distanceObj = {
        value: distance,
        point1: i,
        point2: j,
      } satisfies Distance;

      distances.push(distanceObj);
    }
  }

  return distances;
}

function computeDistance(point1: Point3D, point2: Point3D): number {
  let xDiff = point1.x - point2.x;
  let yDiff = point1.y - point2.y;
  let zDiff = point1.z - point2.z;

  xDiff = xDiff ** 2;
  yDiff = yDiff ** 2;
  zDiff = zDiff ** 2;

  return Math.sqrt(xDiff + yDiff + zDiff);
}

function convertStringToPoint3D(value: string): Point3D {
  let valueParsed = value.split(",").map(Number);

  return {
    x: valueParsed[0],
    y: valueParsed[1],
    z: valueParsed[2],
  };
}

function mergeCircuitsUntilFull(points: Point3D[], distances: Distance[]): Point3D[] {
  let mapPointToCircuit = new Map<number, number>(Array.from({ length: points.length }, (_, i) => [i, i]))
  let mapCircuitToPoints = new Map<number, Array<number>>(Array.from({ length: points.length }, (_, i) => [i, [i]]))

  let currDistanceIndex = 0;
  let currentDistance = distances[currDistanceIndex];

  while(mapCircuitToPoints.size > 1) {
    currentDistance = distances[currDistanceIndex++]

    let firstPointCircuit = mapPointToCircuit.get(currentDistance.point1)!;
    let secondPointCircuit = mapPointToCircuit.get(currentDistance.point2)!;

    if(firstPointCircuit === secondPointCircuit) continue;

    let pointsToMerge = mapCircuitToPoints.get(secondPointCircuit)!
    mapCircuitToPoints.get(firstPointCircuit)?.push(...pointsToMerge)
    mapCircuitToPoints.delete(secondPointCircuit)
    pointsToMerge.forEach(pt => mapPointToCircuit.set(pt, firstPointCircuit))
  }

  return [points[currentDistance.point1], points[currentDistance.point2]];
}

export function Part1() {
  // const inp = help.readShortInputByDay(8);
  const inp = help.readInputByDay(8);

  let boxes = inp.split("\n").map((x) => x.trim());

  let points = boxes.map(convertStringToPoint3D);

  let distancesOrdered = calculateDistances(points).sort(
    (a, b) => a.value - b.value
  );

  let graph = createGraph(distancesOrdered, points.length, 1000)

  let lengths = countCircuitLengths(graph, points.length)

  let threeLongestLengths = lengths.sort((a, b) => b - a).slice(0, 3)

  let result = threeLongestLengths.reduce((acc, curr) => acc * curr, 1)

  console.log("Part 1: ", result);
}

export function Part2() {
  // const inp = help.readShortInputByDay(8);
  const inp = help.readInputByDay(8);

  let boxes = inp.split("\n").map((x) => x.trim());

  let points = boxes.map(convertStringToPoint3D);

  let distancesOrdered = calculateDistances(points).sort(
    (a, b) => a.value - b.value
  );

  let lastTwoPoints = mergeCircuitsUntilFull(points, distancesOrdered)

  let result = lastTwoPoints.reduce((acc, curr) => acc * curr.x, 1)

  console.log("Part 2: ", result);
}
