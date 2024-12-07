import * as fs from 'fs';

export async function readTxtLines(fileName: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
            resolve(lines);
        });
    });
}