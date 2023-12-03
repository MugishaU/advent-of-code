const events = require('events');
const fs = require('fs');
const readline = require('readline');

async function processEachLine(filename) {
  try {
    let total = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      const lineAmount = getCalibrationValues(line);
      // console.log(lineAmount);
      total += lineAmount;
    });

    await events.once(rl, 'close');

    console.log(total);
    return total;
  } catch (err) {
    console.error(err);
  }
}

function getCalibrationValues(line) {
  const numbers = [];
  for (char of line) {
    if (!isNaN(Number(char))) {
      numbers.push(char);
    }
  }

  if (numbers.length > 1) {
    x = numbers.shift();
    y = numbers.pop();
    return Number(x + y);
  }

  return Number(numbers[0] + numbers[0]);
}

processEachLine('input.txt');
// getCalibrationValues('l54in30e1');
