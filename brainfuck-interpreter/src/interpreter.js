import * as colors from "ansi-colors";
import fs from "fs";

import Instruction from "./instruction.js";


function wrappingAddOnByte(number, amount) {
  const available = 255 - number;

  if (amount > available) {
    return amount - (available + 1);
  }

  return number + amount;
}

function wrappingSubOnByte(number, amount) {
  if (amount > number) {
    return 255 - (amount - number - 1);
  }

  return number - amount;
}

export const __private__ = { wrappingAddOnByte, wrappingSubOnByte };


export default class Interpreter {
  static get MEMORY_SIZE() {
    return 30000;
  }


  constructor(script = "") {
    this.program = [];
    this.load(script);
  }


  execute() {
    let stdin;
    try {
      stdin = fs.openSync("/dev/stdin", "rs");
    } catch (error) {
      throw new Error(
        `${colors.red("RuntimeError:")} Unexpected IO error occurred (${error.message})`,
      );
    }

    const readWriteBuffer = Buffer.alloc(1);

    const tape = new Array(Interpreter.MEMORY_SIZE).fill(0);
    let readingHeadLocation = 0;

    let currentInstructionIndex = 0;
    while (currentInstructionIndex !== this.program.length) {
      const currentInstruction = this.program[currentInstructionIndex];
      switch (currentInstruction._type) {
        case Instruction.type.MOVE_LEFT: {
          if (currentInstruction.data > readingHeadLocation) {
            fs.closeSync(stdin);
            throw new Error(`${colors.red("RuntimeError:")} Attempted to access a negative cell`);
          }
          readingHeadLocation -= currentInstruction.data;
          break;
        }
        case Instruction.type.MOVE_RIGHT: {
          if (currentInstruction.data > Interpreter.MEMORY_SIZE - (readingHeadLocation + 1)) {
            fs.closeSync(stdin);
            throw new Error(
              `${colors.red("RuntimeError:")} Attempted to access a cell, which is above the cell limit`,
            );
          }
          readingHeadLocation += currentInstruction.data;
          break;
        }
        case Instruction.type.INCREMENT: {
          tape[readingHeadLocation] =
            wrappingAddOnByte(tape[readingHeadLocation], currentInstruction.data);
          break;
        }
        case Instruction.type.DECREMENT: {
          tape[readingHeadLocation] =
            wrappingSubOnByte(tape[readingHeadLocation], currentInstruction.data);
          break;
        }
        case Instruction.type.READ: {
          try {
            if (fs.readSync(stdin, readWriteBuffer, 0, 1, null) === 0) {
              tape[readingHeadLocation] = 0;
            } else {
              tape[readingHeadLocation] = readWriteBuffer[0];
            }
          } catch (error) {
            fs.closeSync(stdin);
            throw new Error(
              `${colors.red("RuntimeError:")} Unexpected IO error occurred (${error.message})`,
            );
          }
          break;
        }
        case Instruction.type.WRITE: {
          try {
            readWriteBuffer[0] = tape[readingHeadLocation];
            process.stdout.write(readWriteBuffer);
          } catch (error) {
            fs.closeSync(stdin);
            throw new Error(
              `${colors.red("RuntimeError:")} Unexpected IO error occurred (${error.message})`,
            );
          }
          break;
        }
        case Instruction.type.START_LOOP: {
          if (tape[readingHeadLocation] === 0) {
            currentInstructionIndex = currentInstruction.data;
          }
          break;
        }
        case Instruction.type.END_LOOP: {
          if (tape[readingHeadLocation] !== 0) {
            currentInstructionIndex = currentInstruction.data;
          }
          break;
        }
      }
      currentInstructionIndex += 1;
    }

    fs.closeSync(stdin);
    return tape;
  }

  load(script) {
    let currentLine = 1;
    let currentColumn = 1;

    const loopBalancer = [];

    const newProgram = [];
    for (const token of script) {
      switch (token) {
        case "<": {
          if (newProgram.length === 0) {
            newProgram.push(new Instruction(Instruction.type.MOVE_LEFT, 1));
            continue;
          }
          const previousInstruction = newProgram[newProgram.length - 1];
          switch (previousInstruction._type) {
            case Instruction.type.MOVE_LEFT: {
              previousInstruction.data++;
              break;
            }
            case Instruction.type.MOVE_RIGHT: {
              previousInstruction.data--;
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            default: {
              newProgram.push(new Instruction(Instruction.type.MOVE_LEFT, 1));
              break;
            }
          }
          break;
        }
        case ">": {
          if (newProgram.length === 0) {
            newProgram.push(new Instruction(Instruction.type.MOVE_RIGHT, 1));
            continue;
          }
          const previousInstruction = newProgram[newProgram.length - 1];
          switch (previousInstruction._type) {
            case Instruction.type.MOVE_RIGHT: {
              previousInstruction.data++;
              break;
            }
            case Instruction.type.MOVE_LEFT: {
              previousInstruction.data--;
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            default: {
              newProgram.push(new Instruction(Instruction.type.MOVE_RIGHT, 1));
              break;
            }
          }
          break;
        }
        case "+": {
          if (newProgram.length === 0) {
            newProgram.push(new Instruction(Instruction.type.INCREMENT, 1));
            continue;
          }
          const previousInstruction = newProgram[newProgram.length - 1];
          switch (previousInstruction._type) {
            case Instruction.type.INCREMENT: {
              previousInstruction.data = wrappingAddOnByte(previousInstruction.data, 1);
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            case Instruction.type.DECREMENT: {
              previousInstruction.data--;
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            default: {
              newProgram.push(new Instruction(Instruction.type.INCREMENT, 1));
              break;
            }
          }
          break;
        }
        case "-": {
          if (newProgram.length === 0) {
            newProgram.push(new Instruction(Instruction.type.DECREMENT, 1));
            continue;
          }
          const previousInstruction = newProgram[newProgram.length - 1];
          switch (previousInstruction.type) {
            case Instruction.type.DECREMENT: {
              previousInstruction.data = wrappingAddOnByte(previousInstruction.data, 1);
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            case Instruction.type.INCREMENT: {
              previousInstruction.data--;
              if (previousInstruction.data === 0) {
                newProgram.pop();
              }
              break;
            }
            default: {
              newProgram.push(new Instruction(Instruction.type.DECREMENT, 1));
              break;
            }
          }
          break;
        }
        case ",": {
          newProgram.push(new Instruction(Instruction.type.READ));
          break;
        }
        case ".": {
          newProgram.push(new Instruction(Instruction.type.WRITE));
          break;
        }
        case "[": {
          loopBalancer.push([newProgram.length, currentLine, currentColumn]);
          newProgram.push(new Instruction(Instruction.type.START_LOOP, 0));
          break;
        }
        case "]": {
          if (loopBalancer.length === 0) {
            throw new Error(
              `${colors.red("SyntaxError:")} Unable to find the opening bracket of ']' at ${currentLine}:${currentColumn}`,
            );
          }
          const [matchingStartLoopInstructionIndex] = loopBalancer.pop();
          newProgram[matchingStartLoopInstructionIndex].data = newProgram.length;
          newProgram.push(
            new Instruction(Instruction.type.END_LOOP, matchingStartLoopInstructionIndex),
          );
          break;
        }
        case "\n": {
          currentLine++;
          currentColumn = 0;
          break;
        }
        default: {
          break;
        }
      }
      currentColumn += 1;
    }

    if (loopBalancer.length !== 0) {
      const [, line, column] = loopBalancer.pop();
      throw new Error(
        `${colors.red("SyntaxError:")} Unable to find the closing bracket of '[' at ${line}:${column}`,
      );
    }

    this.program = newProgram;
  }

  toString() {
    return this.program.map(Instruction.toString).join();
  }
}
