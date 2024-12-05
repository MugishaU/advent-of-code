import csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

const INPUT_CSV_FILE_PATH = path.join(__dirname, `input.txt`);

const readFromCSV = async (): Promise<{left: number[], right: number[]}> => {
    return new Promise((resolve, reject) => {
      const left: number[] = []
      const right: number[] = []
  
      fs.createReadStream(INPUT_CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (data: string) => {
            Object.values(data).forEach(row => {
                const [l,r] = row.split("   ")
                left.push(Number(l.trim()))
                right.push(Number(r.trim()))
            })
        })
        .on('end', () => resolve({left, right}))
        .on('error', error => reject(error));
    });
  };

const trigger = async () => {
    const {left, right} = await readFromCSV()
    left.sort((a,b) => a - b)
    right.sort((a,b) => a - b)

    let total = 0

    // for(let i = 0; i < left.length; i++){
    //     total += Math.abs(left[i] - right[i])
    // }

    const rightAppearances: Record<number,number> = {}

    right.forEach(num => {
        if(num in rightAppearances){
            rightAppearances[num] += 1
        } else {
            rightAppearances[num] = 1
        }
    })

    left.forEach(num => {
        if(num in rightAppearances){
            total += num * rightAppearances[num]
        }
    })

    console.log(total)

    


}

void trigger()