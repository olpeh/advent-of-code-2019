const fs = require('fs');
const assert = require('assert');

const run = async () => {
  console.log('Starting up');

  // Fuel required to launch a given module is based on its mass. Specifically,
  // to find the fuel required for a module, take its mass, divide by three,
  // round down, and subtract 2.

  // For example:
  // For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
  // For a mass of 14, dividing by 3 and rounding down still yields 4,
  // so the fuel required is also 2.
  // For a mass of 1969, the fuel required is 654.
  // For a mass of 100756, the fuel required is 33583.
  assert.equal(calculateFuelRequired(12), 2);
  assert.equal(calculateFuelRequired(14), 2);
  assert.equal(calculateFuelRequired(1969), 654);
  assert.equal(calculateFuelRequired(100756), 33583);

  // If the above asserts are true, we can be sure our function works as expected

  // The Fuel Counter-Upper needs to know the total fuel requirement.
  //  To find it, individually calculate the fuel needed for the mass of each
  //  module (your puzzle input), then add together all the fuel values.

  await fs.readFile('./inputs/01.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: number[] = contents
      .split('\n')
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));

    const part1 = splittedInput.reduce(
      (a, b) => a + calculateFuelRequired(b),
      0
    );

    console.log('Result for part 1:', part1);
    // Your puzzle answer was 3352674.
  });
};

const calculateFuelRequired = (module: number) =>
  /* to find the fuel required for a module, take its mass, divide by three,*/
  /* round down, and subtract 2.*/
  Math.floor(module / 3) - 2;

run();
