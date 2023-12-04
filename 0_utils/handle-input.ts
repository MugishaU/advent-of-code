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
      //Function here
    });

    await events.once(rl, 'close');
  } catch (err) {
    console.error(err);
  }
}
