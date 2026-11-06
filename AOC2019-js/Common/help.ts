import * as fs from "fs"
import * as readlineSync from "readline-sync"

export function readInputByDay(dayNumber): string {
  let fileName = `Day_${dayNumber}/input.txt`
  let content = fs.readFileSync(fileName, 'utf-8');
  return content
}

export function readShortInputByDay(dayNumber): string {
  let fileName = `Day_${dayNumber}/shortInput.txt`
  let content = fs.readFileSync(fileName, 'utf-8');
  return content
}

export function promptUserInput(question: string): string {
    const response = readlineSync.question(question);
    
    return response.trim();
}