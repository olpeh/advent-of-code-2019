const fs = require('fs');
const assert = require('assert');

const run = async () => {
  console.log('Starting up');

  console.log('Making sure our program works as expected with known input');
  assert.deepEqual(intCodeProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]), [
    3500,
    9,
    10,
    70,
    2,
    3,
    11,
    0,
    99,
    30,
    40,
    50
  ]);

  console.log("Looks good, let's go");

  await fs.readFile('./inputs/02.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: number[] = contents
      .split(',')
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));

    // Once you have a working computer, the first step is to restore the
    // gravity assist program (your puzzle input) to the "1202 program alarm"
    // state it had just before the last computer caught fire.
    // To do this, before running the program, replace position 1 with the value 12
    //  and replace position 2 with the value 2.
    const inputProgram = [...splittedInput];
    inputProgram[1] = 12;
    inputProgram[2] = 2;

    // What value is left at position 0 after the program halts?
    const value = intCodeProgram(inputProgram)[0];

    console.log('Result for part 1:', value);
  });
};

const intCodeProgram = (input: number[], opCodeIndex = 0) => {
  // Example: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
  // Avoid mutations
  const program = [...input];
  // Make sure we have enought input
  assert(program.length >= opCodeIndex + 4);

  const opCode = program[opCodeIndex];
  const inputPosition1 = program[opCodeIndex + 1];
  const inputPosition2 = program[opCodeIndex + 2];
  const outputPosition = program[opCodeIndex + 3];

  switch (opCode) {
    case 1: {
      // addition
      program[outputPosition] =
        program[inputPosition1] + program[inputPosition2];
      break;
    }
    case 2: {
      // multiplication
      program[outputPosition] =
        program[inputPosition1] * program[inputPosition2];
      break;
    }
    case 99: {
      // halt
      return input;
    }
    default:
      throw Error(`Unknown OpCode ${opCode} encountered`);
  }

  // Step forward 4 positions
  return intCodeProgram(program, opCodeIndex + 4);
};

run();
