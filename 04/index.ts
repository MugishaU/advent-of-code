import * as fs from 'fs';
import * as path from 'path';

const readFile = async (filename: string): Promise<string[][]> => {
  const filePath = path.join(__dirname, filename);

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');

    // Split content into lines and then into characters
    const result: string[][] = data
      .split('\n') // Split by line
      .map((line) => line.trim().split('')); // Split each line into characters

    return result;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err; // Re-throw error for proper handling
  }
};

const crossword = async (filename: string) => {
  const input = await readFile(filename);
  let total = 0;

  input.forEach((row, r) => {
    row.map((column, c) => {
      total += findXmas2(column, r, c, input);
    });
  });

  //   const y = input.map((row, r) => {
  //     const x = row.map((column, c) => {
  //       const z = findXmas(column, r, c, input);
  //       return z == 0 ? "." : z;
  //     });
  //     return x.join(", ");
  //   });

  console.log(total);
};

const findXmas = (
  startingLetter: string,
  row: number,
  column: number,
  grid: string[][]
): number => {
  let count = 0;

  if (startingLetter !== 'X') return count;

  const northBound = row - 3 >= 0;
  const southBound = row + 3 < grid.length;
  const westBound = column - 3 >= 0;
  const eastBound = column + 3 < grid[0].length;

  // north
  if (
    northBound &&
    grid[row][column] == 'X' &&
    grid[row - 1][column] == 'M' &&
    grid[row - 2][column] == 'A' &&
    grid[row - 3][column] == 'S'
  ) {
    count++;
  }

  // south
  if (
    southBound &&
    grid[row][column] == 'X' &&
    grid[row + 1][column] == 'M' &&
    grid[row + 2][column] == 'A' &&
    grid[row + 3][column] == 'S'
  ) {
    count++;
  }

  // west
  if (
    westBound &&
    grid[row][column] == 'X' &&
    grid[row][column - 1] == 'M' &&
    grid[row][column - 2] == 'A' &&
    grid[row][column - 3] == 'S'
  ) {
    count++;
  }

  // east
  if (
    eastBound &&
    grid[row][column] == 'X' &&
    grid[row][column + 1] == 'M' &&
    grid[row][column + 2] == 'A' &&
    grid[row][column + 3] == 'S'
  ) {
    count++;
  }

  // ne
  if (
    northBound &&
    eastBound &&
    grid[row][column] == 'X' &&
    grid[row - 1][column + 1] == 'M' &&
    grid[row - 2][column + 2] == 'A' &&
    grid[row - 3][column + 3] == 'S'
  ) {
    count++;
  }

  // nw
  if (
    northBound &&
    westBound &&
    grid[row][column] == 'X' &&
    grid[row - 1][column - 1] == 'M' &&
    grid[row - 2][column - 2] == 'A' &&
    grid[row - 3][column - 3] == 'S'
  ) {
    count++;
  }

  // se
  if (
    southBound &&
    eastBound &&
    grid[row][column] == 'X' &&
    grid[row + 1][column + 1] == 'M' &&
    grid[row + 2][column + 2] == 'A' &&
    grid[row + 3][column + 3] == 'S'
  ) {
    count++;
  }

  // sw
  if (
    southBound &&
    westBound &&
    grid[row][column] == 'X' &&
    grid[row + 1][column - 1] == 'M' &&
    grid[row + 2][column - 2] == 'A' &&
    grid[row + 3][column - 3] == 'S'
  ) {
    count++;
  }

  return count;
};

const findXmas2 = (
  startingLetter: string,
  row: number,
  column: number,
  grid: string[][]
): number => {
  let count = 0;

  if (startingLetter !== 'A') return count;

  const northBound = row - 1 >= 0;
  const southBound = row + 1 < grid.length;
  const westBound = column - 1 >= 0;
  const eastBound = column + 1 < grid[0].length;
  const allBounds = northBound && southBound && westBound && eastBound;

  if (!allBounds) return count;

  if (
    ((grid[row - 1][column + 1] == 'S' && grid[row + 1][column - 1] == 'M') ||
      (grid[row - 1][column + 1] == 'M' && grid[row + 1][column - 1] == 'S')) &&
    ((grid[row - 1][column - 1] == 'S' && grid[row + 1][column + 1] == 'M') ||
      (grid[row - 1][column - 1] == 'M' && grid[row + 1][column + 1] == 'S'))
  ) {
    count++;
  }

  return count;
};

crossword('input.txt');
