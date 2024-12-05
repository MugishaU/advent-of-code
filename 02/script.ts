import csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

const INPUT_CSV_FILE_PATH = path.join(__dirname, `input.txt`);


const readFromCSV = async (): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
     const res:number[][] = []
  
      fs.createReadStream(INPUT_CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (data: any) => {res.push(data.input.split(" ").map((x: any) => Number(x)))})
        .on('end', () => resolve(res))
        .on('error', error => reject(error));
    });
  };

const trigger = async () => {
    const rows = await readFromCSV()
    let safe = 0

    rows.forEach(row => {
        let isSafe = true
        let life = true
        if (row[0] - row[1] == 0 ) {isSafe = false;}
        
   
        const isDecreasing = row[0] - row[1] > 0

        for(let i = 0; i < row.length - 1; i++){
            const diff = row[i] - row[i+1]
            if((diff < 0 && isDecreasing || diff > 0 && !isDecreasing)) {isSafe = false}
            const absDiff = Math.abs(diff)
            if(absDiff < 1) {isSafe = false;}
            if(absDiff > 3) {isSafe = false;}
        }
    

        if(isSafe) safe++
    })
    
    console.log(safe);
}

void trigger()