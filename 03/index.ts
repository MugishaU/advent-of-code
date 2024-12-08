import { match } from "ramda";
import { readTxtLines } from "../utils/readTxtLines";
import * as path from "path";

const INPUT_PATH = path.join(__dirname, "input.txt");

const trigger = async () => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const rows = await readTxtLines(path.join(__dirname, "input.txt"));
  const matches = rows.map((line) => line.matchAll(regex));
  const muls = [];
  for (const match of matches) {
    for (const thing of match) {
      muls.push(thing[0]);
    }
  }

  //mul(xxx,xxx)
  const mulNums = muls.map((mul) =>
    mul
      .substring(4, mul.length - 1)
      .split(",")
      .map(Number)
  );

  let total = 0;

  mulNums.forEach((mulNum) => (total += mulNum[0] * mulNum[1]));
  console.log(total);
};

void trigger();
