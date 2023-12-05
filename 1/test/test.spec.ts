import { handleInput } from '../part-two';

describe('handleInput', () => {
  const testCases = [
    { name: 'AoC example', file: 0, value: 281 },
    { name: 'handles just numbers', file: 1, value: 100 },
    { name: 'handles just words', file: 2, value: 100 },
    { name: 'handles a mix of both', file: 3, value: 649 },
    { name: 'adds up all 1000 values in numbers', file: 4, value: 11000 },
    { name: 'adds up all 1000 values in words', file: 5, value: 11000 },
    { name: 'adds up all 1000 values mix of both', file: 6, value: 11000 },
    { name: ' the actual puzzle', file: 7, value: 1 }
  ];

  it.each(testCases)(
    'calculates calibration values correctly: $name',
    async ({ file, value }) => {
      const result = await handleInput(`1/test/test-files/test${file}.txt`);
      expect(result).toBe(value);
    }
  );
});
