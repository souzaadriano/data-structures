export interface CsvReaderContract {
    read<T>(input: CsvReaderContract.Read<T>): Promise<void>
}

export namespace CsvReaderContract {
    export type Read<ROW> = {
        path: string
        handler: (row: ROW) => Promise<void>
    }
}