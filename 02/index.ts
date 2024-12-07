import { readTxtLines } from "../utils/readTxtLines";
import * as path from "path";
import { isNil } from "ramda";

const INPUT_PATH = path.join(__dirname, `input.txt`);

const trigger = async () => {
  const rows = (await readTxtLines(INPUT_PATH)).map((line) =>
    line.split(" ").map((num) => Number(num))
  );

  const res = rows.map(checkReport).filter((res) => res === true);
  console.log(res.length);
};

const checkReport = (report: number[]): boolean => {
  const isDecreasing = calcIsDecreasing(report).isDecreasing;

  if (isNil(isDecreasing)) {
    return false;
  }

  if (!isDecreasing) {
    report.reverse();
  }

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1];
    if (diff < 0) {
      return false;
    }

    if (Math.abs(diff) < 1) {
      return false;
    }

    if (Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
};

const calcIsDecreasing = (
  report: number[]
): { isDecreasing: boolean | undefined; dampener: boolean } => {
  if (report[0] - report[1] === 0)
    return { isDecreasing: undefined, dampener: true };
  return { isDecreasing: report[0] - report[1] > 0, dampener: true };
};

void trigger();
