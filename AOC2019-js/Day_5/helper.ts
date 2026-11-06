import { promptUserInput } from '../Common/help.js';

class Command {
  static numberOfParameters: number = 0;
  parameterModes: number[] = [];

  processCommand(opList: number[], currIndex: number): number {
    throw new Error("processCommand not implemented");
  }
}

class AddCommand extends Command {
  static numberOfParameters: number = 3;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];
    const storeInd = opList[currIndex + 3];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    opList[storeInd] = param1 + param2;

    return currIndex + 4;
  }

}

class MultiplyCommand extends Command {
  static numberOfParameters: number = 3;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];
    const storeInd = opList[currIndex + 3];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    opList[storeInd] = param1 * param2;

    return currIndex + 4;
  }
}

class InputCommand extends Command {
  static numberOfParameters: number = 1;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const storeInd = opList[currIndex + 1];
    const input = promptUserInput('Input value: ');
    const inputValue = parseInt(input);

    opList[storeInd] = inputValue;
    return currIndex + 2;
  }
}

class OutputCommand extends Command {
  static numberOfParameters: number = 1;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const num = opList[currIndex + 1];
    const outputValue = getParameterValue(opList, this.parameterModes[0], num);
    console.log(outputValue);
    return currIndex + 2;
  }
}

class JumpIfTrueCommand extends Command {
  static numberOfParameters: number = 2;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }
  
  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    if(param1 !== 0) {
      return param2;
    }

    return currIndex + 3;
  }
}

class JumpIfFalseCommand extends Command {
  static numberOfParameters: number = 2;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }
  
  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    if(param1 === 0) {
      return param2;
    }

    return currIndex + 3;
  }
}

class LessThanCommand extends Command {
  static numberOfParameters: number = 3;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];
    const storeInd = opList[currIndex + 3];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    opList[storeInd] = param1 < param2 ? 1 : 0;

    return currIndex + 4;
  }
}

class EqualsCommand extends Command {
  static numberOfParameters: number = 3;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    const num1 = opList[currIndex + 1];
    const num2 = opList[currIndex + 2];
    const storeInd = opList[currIndex + 3];

    const param1 = getParameterValue(opList, this.parameterModes[0], num1);
    const param2 = getParameterValue(opList, this.parameterModes[1], num2);

    opList[storeInd] = param1 === param2 ? 1 : 0;

    return currIndex + 4;
  }
}

class HaltCommand extends Command {
  static numberOfParameters: number = 0;
  parameterModes: number[] = [];

  constructor(parameterModes: number[]) {
    super();
    this.parameterModes = parameterModes;
  }

  processCommand(opList: number[], currIndex: number): number {
    return -1;
  }
}

const commandMapper = {
  1: AddCommand,
  2: MultiplyCommand,
  3: InputCommand,
  4: OutputCommand,
  5: JumpIfTrueCommand,
  6: JumpIfFalseCommand,
  7: LessThanCommand,
  8: EqualsCommand,
  99: HaltCommand
}

function getParameterValue(opList: number[], parameterMode: number, parameterIndex: number): number {
  if(parameterMode === 0) {
    return opList[parameterIndex];
  } else if(parameterMode === 1) {
    return parameterIndex;
  } else {
    throw new Error(`Invalid parameter mode: ${parameterMode}`);
  }
}

export function getCommandFromCode(code: number): Command {
  const opCode = code % 100;
  code = Math.floor(code / 100);

  const parameterModes: number[] = [];
  const commandClass = commandMapper[opCode];

  if(commandClass === undefined) {
    throw new Error(`Invalid command code: ${opCode}`);
  }

  for(let i = 0; i < commandClass.numberOfParameters; i++) {
    parameterModes.push(code % 10);
    code = Math.floor(code / 10);
  }

  return new commandClass(parameterModes);
}
