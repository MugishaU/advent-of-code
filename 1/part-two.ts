import events from 'events';
import * as fs from 'fs';
import * as rd from 'readline';

async function handleInput(filename: string) {
  try {
    const rl = rd.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      console.log(line);
    });

    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
}

function calibrationValue(line: string) {
  const words = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
  ];
  for (const i of line) {
    console.log(i);
  }
}

// handleInput('input.txt');
calibrationValue('xtwone3four');
