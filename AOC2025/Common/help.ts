import * as fs from "fs"

export function readInputByDay(dayNumber) {
  let fileName = `Day_${dayNumber}/input.txt`
  let content = fs.readFileSync(fileName, 'utf-8');
  return content
}

export function readShortInputByDay(dayNumber) {
  let fileName = `Day_${dayNumber}/shortInput.txt`
  let content = fs.readFileSync(fileName, 'utf-8');
  return content
}
