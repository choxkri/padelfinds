import * as fs from 'fs';
import csvParser from 'csv-parser';

interface Record {
  price: string;
}


function readCsv(csvPath: string): Promise<Record[]> {
  return new Promise((resolve, reject) => {
    var results: Record[] = [];
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push({
          price: row["money"]
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

async function showData() {
  var data = await readCsv("../noxsport.csv");
  console.log(data);
}

showData()