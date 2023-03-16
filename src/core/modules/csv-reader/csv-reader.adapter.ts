import { CsvReaderContract } from './csv-reader.contract';
import * as fs from 'fs';
import { parse } from '@fast-csv/parse';

export class CsvReader implements CsvReaderContract {
  async read<T>(input: CsvReaderContract.Read<T>): Promise<void> {
    const { path, handler } = input;
    fs.createReadStream(path)
      .pipe(parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', handler)
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
  }
}
