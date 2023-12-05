import events from 'events';
import * as fs from 'fs';
import * as rd from 'readline';

function isNum(letter: string) {
  return !isNaN(Number(letter));
}

function calibrationValue(line: string) {
  const values: string[] = [];
  const spelledDigits = {
    three: ['one', 'two', 'six', 'ten'],
    four: ['four', 'five', 'nine'],
    five: ['three', 'seven', 'eight']
  };

  const dictionary: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
  };

  let leftPointer = 0;
  let rightPointer = 0;
  let tempSubstring = '';

  while (leftPointer < line.length) {
    switch (tempSubstring.length) {
      // Check if temporary substring matches a digit
      case 3:
        if (spelledDigits.three.includes(tempSubstring)) {
          values.push(tempSubstring);
          leftPointer = rightPointer;
          tempSubstring = '';
        }
        break;
      case 4:
        if (spelledDigits.four.includes(tempSubstring)) {
          values.push(tempSubstring);
          leftPointer = rightPointer;
          tempSubstring = '';
        }
        break;
      case 5:
        if (spelledDigits.five.includes(tempSubstring)) {
          values.push(tempSubstring);
          leftPointer = rightPointer;
          tempSubstring = '';
        }
        break;
      default:
        break;
    }

    if (isNum(line[leftPointer])) {
      // If: left pointer is a number, add to values and move left pointer to next position to restart
      values.push(line[leftPointer]);
      leftPointer++;
      rightPointer = leftPointer;
    } else if (
      tempSubstring.length == 6 ||
      rightPointer > line.length ||
      isNum(line[rightPointer])
    ) {
      /**
       * If:
       *  - temporary substring is over 5 digits long without a match
       *  - right pointer has gone past end of the line
       *  - right pointer has landed on a number before a match
       *
       * Then:
       *  - move left pointer to next position to restart
       *  - clear temporary substring
       */
      leftPointer++;
      rightPointer = leftPointer;
      tempSubstring = '';
    } else {
      // Else: Add right pointer character to temporary substring and move right pointer to next position
      tempSubstring += line[rightPointer];
      rightPointer++;
    }
  }

  const convertedValues = values.map(string => {
    if (string.length > 1) {
      return dictionary[string];
    } else {
      return string;
    }
  });

  if (convertedValues.length > 1) {
    const x = convertedValues.shift();
    const y = convertedValues.pop();
    //@ts-expect-error It won't be undefined
    return Number(x + y);
  }

  return Number(convertedValues[0] + convertedValues[0]);
}

export async function handleInput(filename: string) {
  try {
    const rl = rd.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    let total = 0;

    rl.on('line', line => {
      const lineAmount = calibrationValue(line);
      total += lineAmount;
    });

    await events.once(rl, 'close');
    return total;
  } catch (err) {
    console.error(err);
    throw new Error((err as Error).message);
  }
}

// handleInput('1/input.txt').then(res => console.log(res));
