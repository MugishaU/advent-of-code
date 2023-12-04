import { handleInput } from '../part-two';

describe('handleInput', () => {
  it.each([
    {
      file: 'test1',
      value: 29
    }
  ])(
    'calculates calibration values correctly: $file',
    async ({ file, value }) => {
      const result = await handleInput(`1/test/test-files/${file}.txt`);
      expect(result).toBe(value);
    }
  );
});
