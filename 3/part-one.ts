import events from 'events';
import * as fs from 'fs';
import * as rd from 'readline';
import { isNum } from '../0_utils/isNum';

async function handleInput(filename: string): Promise<string[][]> {
  try {
    const engine: string[][] = [];
    const rl = rd.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      const row = line.split('');
      engine.push(row);
    });

    await events.once(rl, 'close');
    return engine;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

function calculate(engine: string[][]) {
  let total = 0;

  for (const [rowIdx, row] of engine.entries()) {
    // Loop through each row
    let tempNumber = '';
    // let numberToggle = false; // Toggle to track when a new number is first encountered
    const adjIdxs: Set<string> = new Set();

    for (const [itemIdx, item] of row.entries()) {
      // Loop through each item in a row
      if (isNum(item) && itemIdx < row.length - 1) {
        // numberToggle = true; // Toggle switch to get total number
        tempNumber += item; // Add first digit to tempNumber

        // Add adjacent indices value to check later.
        // Order: top left, top mid, top right, mid left,
        // mid right, bottom left, bottom mid, bottom right

        const maybeIdxs = [
          [rowIdx - 1, itemIdx - 1],
          [rowIdx - 1, itemIdx],
          [rowIdx - 1, itemIdx + 1],
          [rowIdx, itemIdx - 1],
          [rowIdx, itemIdx + 1],
          [rowIdx + 1, itemIdx - 1],
          [rowIdx + 1, itemIdx],
          [rowIdx + 1, itemIdx + 1]
        ];

        // Remove indexes that aren't possible
        // Order: above engine, below engine, left of engine, right of engine
        const idxs = maybeIdxs.filter(
          ([maybeRow, maybeItem]) =>
            maybeRow >= 0 &&
            maybeRow < engine.length &&
            maybeItem >= 0 &&
            maybeItem < row.length
        );

        const strIdxs = idxs.map(idx => idx.join(',')); // Map to string to make set work better
        strIdxs.forEach(strIdx => adjIdxs.add(strIdx)); // Add each value to set
      } else if (isNum(item) && itemIdx === row.length - 1) {
        // Handle case when number at end of row
        tempNumber += item;

        const maybeIdxs = [
          [rowIdx - 1, itemIdx - 1],
          [rowIdx - 1, itemIdx],
          [rowIdx - 1, itemIdx + 1],
          [rowIdx, itemIdx - 1],
          [rowIdx, itemIdx + 1],
          [rowIdx + 1, itemIdx - 1],
          [rowIdx + 1, itemIdx],
          [rowIdx + 1, itemIdx + 1]
        ];

        const validIdxs = maybeIdxs.filter(
          ([maybeRow, maybeItem]) =>
            maybeRow >= 0 &&
            maybeRow < engine.length &&
            maybeItem >= 0 &&
            maybeItem < row.length
        );

        const strIdxs = validIdxs.map(idx => idx.join(',')); // Map to string to make set work better
        strIdxs.forEach(strIdx => adjIdxs.add(strIdx));

        const idxs = Array.from(adjIdxs);
        const adjCheck = idxs.map(idx => {
          const [x, y] = idx.split(',').map(i => Number(i));
          return !isNum(engine[x][y]) && engine[x][y] !== '.';
        });
        if (adjCheck.includes(true)) {
          const validNum = Number(tempNumber);
          total += Number(validNum);
        }
        tempNumber = '';
        adjIdxs.clear();
      } else if (tempNumber.length > 0) {
        const idxs = Array.from(adjIdxs);
        const adjCheck = idxs.map(idx => {
          const [x, y] = idx.split(',').map(i => Number(i));
          return !isNum(engine[x][y]) && engine[x][y] !== '.';
        });
        if (adjCheck.includes(true)) {
          const validNum = Number(tempNumber);
          total += Number(validNum);
        }
        tempNumber = '';
        adjIdxs.clear();
      }
    }
  }
  return total;
}

handleInput('3/input.txt').then(x => console.log(calculate(x)));
