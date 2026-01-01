import * as help from "../Common/help.js";

let graph: Map<string, Array<string>> = new Map();
let memo: Map<string, number> = new Map();

function reset() {
  graph = new Map();
  memo = new Map();
}

function addToGraph(source: string, dests: string[]) {
  if (!graph.has(source)) {
    graph.set(source, []);
  }

  graph.get(source)?.push(...dests);
}

function getNumberOfPathsRec(from: string, dest: string) {
  if (from === dest) return 1;

  let memoKey = from;

  if(memo.has(memoKey)) return memo.get(memoKey)!

  let dests = graph.get(from)!;

  let count = 0

  for(let i = 0; i < dests.length; i++) {
      count += getNumberOfPathsRec(dests[i], dest)
  }

  memo.set(memoKey, count)

  return count;
}

function getNumberOfPathsPart2Rec(from: string, dest: string, mask: number) {
  if (from === dest) {
    return mask === 3 ? 1 : 0;
  }

  const memoKey = `${from}|${mask}`;

  if(memo.has(memoKey)) return memo.get(memoKey)!

  let newMask = mask;
  if (from === 'fft') newMask |= 1;
  if (from === 'dac') newMask |= 2;

  let dests = graph.get(from)!;

  let count = 0

  for(let i = 0; i < dests.length; i++) {
      count += getNumberOfPathsPart2Rec(dests[i], dest, newMask)
  }

  memo.set(memoKey, count)

  return count;
}

function getNumberOfPathsPart2(from: string, dest: string) {
  return getNumberOfPathsPart2Rec(from, dest, 0)
}

export function Part1() {
  // const inp = help.readShortInputByDay(11);
  const inp = help.readInputByDay(11);

  let input = inp.split("\n").map((x) => x.trim());

  reset();

  input.forEach((x) => {
    let [source, rest] = x.split(": ");

    addToGraph(source, rest.split(" "));
  });

  let numberOfPaths = getNumberOfPathsRec("you", "out");

  console.log("Part 1: ", numberOfPaths);
}

export function Part2() {
  // const inp = help.readShortInputByDay(11);
  const inp = help.readInputByDay(11);

  let input = inp.split("\n").map((x) => x.trim());

  reset();

  input.forEach((x) => {
    let [source, rest] = x.split(": ");

    addToGraph(source, rest.split(" "));
  });

  let numberOfPaths = getNumberOfPathsPart2("svr", "out");

  console.log("Part 2: ", numberOfPaths);
}
