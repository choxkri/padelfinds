import * as fs from 'fs';
import csvParser from 'csv-parser';

interface Record {
  name: string;
  age: number;
  city: string;
}

const results: Record[] = [];

fs.createReadStream('../noxsport.csv')
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(results);
  });
