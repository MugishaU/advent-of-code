import events from 'events';
import * as fs from 'fs';
import * as rd from 'readline';

async function handleInput(filename: string) {
  try {
    const rl = rd.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    let total = 0;

    rl.on('line', line => {
      const value = processLine(line);
      total += value;
    });

    await events.once(rl, 'close');
    return total;
  } catch (err) {
    console.error(err);
  }
}

function processLine(line: string) {
  let gamePossible = true;
  const bag: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14
  };
  let [gameId, game] = line.split(':');
  const id = Number(gameId.split(' ')[1]);

  game = game.trim();

  const rounds = game.split(';');

  for (const round of rounds) {
    const rounds = round.split(',');
    for (let round of rounds) {
      round = round.trim();
      const [value, colour] = round.split(' ');
      if (Number(value) > bag[colour]) {
        gamePossible = false;
      }
    }
  }

  return gamePossible ? id : 0;
}

handleInput('2/input.txt').then(res => console.log(res));
