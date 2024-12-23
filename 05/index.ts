import * as fs from 'fs';
import * as path from 'path';

const readFile = async (filename: string): Promise<string[]> => {
  const filePath = path.join(__dirname, filename);

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');

    // Split content into lines and then into characters
    const result: string[] = data.split('\n'); // Split by line

    return result;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err; // Re-throw error for proper handling
  }
};

const followsRule = (rule: string[], update: string[]): boolean => {
  const first = update.indexOf(rule[0]);
  const second = update.indexOf(rule[1]);

  if (first == -1 || second == -1) {
    return true;
  }

  if (first < second) {
    return true;
  }

  return false;
};

const checkUpdates = async (filename: string) => {
  const input = await readFile(filename);

  const rules: string[][] = [];
  const updates: string[][] = [];

  input.forEach((line) => {
    if (line.includes('|')) {
      rules.push(line.split('|'));
    } else if (line.includes(',')) {
      updates.push(line.split(','));
    }
  });

  const correctUpdates: string[][] = [];

  updates.forEach((update) => {
    let pass = true;
    rules.forEach((rule) => {
      if (!followsRule(rule, update)) {
        pass = false;
      }
    });
    if (pass) {
      correctUpdates.push(update);
    }
  });

  const mid = correctUpdates.reduce((total, nextUpdate) => {
    const index = nextUpdate.length / 2 - 0.5;
    return total + Number(nextUpdate[index]);
  }, 0);

  console.log(mid);
};

checkUpdates('input.txt');
