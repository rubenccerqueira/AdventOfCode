#!/usr/bin/env python3

import os

dayNumber = int(input("Day Number: "))

folderName = f'Day_{dayNumber}'

os.mkdir(folderName)

templateCode = ("import * as help from '../Common/help.js';\n\n"
  'export function Part1() {\n'
  f'  const inp = help.readShortInputByDay({dayNumber});\n'
  f'  // const inp = help.readInputByDay({dayNumber});\n\n'
  f'  console.log("Part 1: ", "res");\n'
  '}\n\n'

  'export function Part2() {\n'
  f'  const inp = help.readShortInputByDay({dayNumber});\n'
  f'  // const inp = help.readInputByDay({dayNumber});\n\n'
  f'  console.log("Part 2: ", "res");\n'
  '}\n'
)

open(folderName + '/input.txt','w').close()
open(folderName + '/shortInput.txt','w').close()
  
with open(folderName + '/main.ts','w') as f:
  f.write(templateCode)

importContent = (f"import * as Day{dayNumber} from \"./Day_{dayNumber}/main\";\n")
dayCodeExecutionContent = (f"\n\nDay{dayNumber}.Part1();\nDay{dayNumber}.Part2();")

with open('index.ts', 'r+') as f:
  content = f.read()
  content = importContent + content + dayCodeExecutionContent
  f.seek(0)
  f.write(content)
  f.truncate()