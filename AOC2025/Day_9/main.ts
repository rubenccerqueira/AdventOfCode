import * as help from "../Common/help.js";

interface Edge {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Area {
  value: number;
  point1: Point2D;
  point2: Point2D;
}

function calculateArea(point1: Point2D, point2: Point2D): number {
  return (
    (Math.abs(point1.x - point2.x) + 1) * (Math.abs(point1.y - point2.y) + 1)
  );
}

function calculateAreas(points: Point2D[]): Area[] {
  const areas = [] as Area[];

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let area = calculateArea(points[i], points[j]);

      let areaObj = {
        value: area,
        point1: points[i],
        point2: points[j],
      } satisfies Area;

      areas.push(areaObj);
    }
  }

  return areas;
}

function convertStringToPoint2D(value: string): Point2D {
  let valueParsed = value.split(",").map(Number);

  let x = valueParsed[0];
  let y = valueParsed[1];

  return {
    x,
    y,
  };
}

function generateEdges(points: Point2D[]): Edge[] {
  let result = [] as Edge[];

  for (let i = 0; i < points.length; i++) {
    let fst = points[i];
    let scd: Point2D;

    if(i === points.length - 1) {
      scd = points[0]
    } else {
      scd = points[i + 1]
    }

    let edge: Edge = {
      x1: fst.x,
      y1: fst.y,
      x2: scd.x,
      y2: scd.y,
    };

    result.push(edge);
  }

  return result;
}

function rectangleIntersectsAnyEdge(point1: Point2D, point2: Point2D, edges: Edge[]): boolean {
  const [minX, maxX] = [point1.x, point2.x].sort((a, b) => a - b);
  const [minY, maxY] = [point1.y, point2.y].sort((a, b) => a - b)

  for (const e of edges) {
    const [eMinX, eMaxX] = [e.x1, e.x2].sort((a, b) => a - b)
    const [eMinY, eMaxY] = [e.y1, e.y2].sort((a, b) => a - b)

    if (
      minX < eMaxX &&
      maxX > eMinX &&
      minY < eMaxY &&
      maxY > eMinY
    ) {
      return true;
    }
  }
  return false;
}

function calculateManhattanSquareDistance(p1: Point2D, p2: Point2D): number {
  return (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)) ** 2;
}

function calculateAreaPart2(points: Point2D[], edges: Edge[]): Area {
  let bestArea: Area = { value: 0, point1: { x: 0, y: 0 }, point2: { x: 0, y: 0 } };

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if(calculateManhattanSquareDistance(points[i], points[j]) < bestArea.value) {
        continue;
      }

      let area = calculateArea(points[i], points[j]);

      if(area < bestArea.value) {
        continue;
      }

      if(rectangleIntersectsAnyEdge(points[i], points[j], edges)) {
        continue;
      }

      let areaObj = {
        value: area,
        point1: points[i],
        point2: points[j],
      } satisfies Area;

      bestArea = areaObj;
    }
  }

  return bestArea;
}

export function Part1() {
  // const inp = help.readShortInputByDay(9);
  const inp = help.readInputByDay(9);

  const points = inp
    .split("\n")
    .map((x) => x.trim())
    .map(convertStringToPoint2D);

  const areas = calculateAreas(points);

  const largestAreas = areas.sort((a, b) => b.value - a.value);

  console.log("Part 1: ", largestAreas[0].value);
}

export function Part2() {
  // const inp = help.readShortInputByDay(9);
  const inp = help.readInputByDay(9);

  const points = inp
    .split("\n")
    .map((x) => x.trim())
    .map(convertStringToPoint2D);

  const greenPoints = generateEdges(points);

  const area = calculateAreaPart2(points, greenPoints);

  console.log("Part 2: ", area.value);
}
