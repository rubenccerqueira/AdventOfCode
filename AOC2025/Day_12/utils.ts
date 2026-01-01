type GridMask = bigint;

export interface Region {
  grid: GridMask;
  width: number;
  height: number;
  reqPresents: number[]
}

export interface ShapePlacement {
  mask: GridMask;
}

export interface PresentOptimized {
  area: number;
  placements: ShapePlacement[];
}

export function parseInput(value: string): [string[][][], Region[]] {
  let valueSplitted = value.split('\n\n');
  let regionsStr = valueSplitted.pop()!;
  let presentsStr = valueSplitted;

  let presents = presentsStr.map(present => present
    .split('\n')
    .slice(1)
    .map(x => x.split('')))

  let regions: Region[] = regionsStr.split('\n').map(regionStr => {
    const [dims, presents] = regionStr.split(': ');

    const [dimCol, dimRow] = dims.split('x')
    const presentArray = presents.split(' ').map(Number)

    return {
      grid: 0n,
      width: Number(dimCol),
      height: Number(dimRow),
      reqPresents: presentArray
    } satisfies Region
  })

  return [presents, regions]
}

function rotateMatrix(matrix: string[][]): string[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated: string[][] = Array.from({ length: cols }, () => Array(rows).fill('.'));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c];
    }
  }

  return rotated;
}

function trim(shape: string[][]): string[][] {
  let top = 0, bottom = shape.length - 1;
  let left = 0, right = shape[0].length - 1;

  while (top <= bottom && shape[top].every(c => c === ".")) top++;
  while (bottom >= top && shape[bottom].every(c => c === ".")) bottom--;
  while (left <= right && shape.every(row => row[left] === ".")) left++;
  while (right >= left && shape.every(row => row[right] === ".")) right--;

  const res: string[][] = [];
  for (let r = top; r <= bottom; r++) {
    res.push(shape[r].slice(left, right + 1));
  }
  return res;
}

function shapeKey(shape: string[][]): string {
  return shape.map(row => row.join('')).join(';');
}

export function generateShapes(present: string[][], region: Region): PresentOptimized {
  const seen = new Set<string>();
  let shape = trim(present);

  const uniqueShapes: string[][][] = [];

  for (let i = 0; i < 4; i++) {
    const key = shapeKey(shape);
    if (!seen.has(key)) {
      seen.add(key);
      uniqueShapes.push(shape);
    }
    shape = trim(rotateMatrix(shape));
  }

  const placements: ShapePlacement[] = [];
  let area = 0;

  for (const s of uniqueShapes) {
    const h = s.length;
    const w = s[0].length;

    const filled: [number,number][] = [];
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (s[r][c] !== ".") {
          filled.push([r,c]);
        }
      }
    }

    area = filled.length;

    for (let gr = 0; gr + h <= region.height; gr++) {
      for (let gc = 0; gc + w <= region.width; gc++) {
        let mask = 0n;

        for (const [sr, sc] of filled) {
          const bit = BigInt((gr + sr) * region.width + (gc + sc));
          mask |= 1n << bit;
        }

        placements.push({ mask });
      }
    }
  }

  return { area, placements };
}

export function prettyPrintMatrix(matrix: string[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for(let i = 0; i < rows + 2; i++) {process.stdout.write("-")}
  console.log()

  for(let i = 0; i < rows; i++) {
    process.stdout.write('|')

    for(let j = 0; j < cols; j++) {
      process.stdout.write(matrix[i][j])
    }

    console.log('|')
  }

  for(let i = 0; i < rows + 2; i++) {process.stdout.write("-")}
  console.log()
}

// Deprecated functions, kept for reference
export function shapeFitsGrid(shape: string[][], grid: string[][], startRow: number, startCol: number): boolean {
  const shapeRows = shape.length;
  const shapeCols = shape[0].length;
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  if(startRow + shapeRows > gridRows || startCol + shapeCols > gridCols) {
    return false;
  }

  for(let r = 0; r < shapeRows; r++) {
    for(let c = 0; c < shapeCols; c++) {
      if(shape[r][c] === '#') {
        if(grid[startRow + r][startCol + c] !== '.') {
          return false;
        }
      }
    }
  }

  return true;
}

export function placeShapeOnGrid(shape: string[][], grid: string[][], startRow: number, startCol: number): string[][] {
  const shapeRows = shape.length;
  const shapeCols = shape[0].length;
  const newGrid = grid.map(row => row.slice());

  for(let r = 0; r < shapeRows; r++) {
    for(let c = 0; c < shapeCols; c++) {
      if(shape[r][c] === '#') {
        newGrid[startRow + r][startCol + c] = '#';
      }
    }
  }

  return newGrid;
}
// End of deprecated functions

export function popcount(x: bigint): number {
  let count = 0;
  while (x > 0n) {
    x &= x - 1n;
    count++;
  }
  return count;
}

export function remainingArea(mask: bigint, totalCells: number): number {
  return totalCells - popcount(mask);
}

export function requiredArea(presents: PresentOptimized[], req: number[]): number {
  let sum = 0;
  for (let i = 0; i < req.length; i++) {
    sum += req[i] * presents[i].area;
  }
  return sum;
}