export interface UseCaseContract<INPUT, OUTPUT> {
    execute(input: INPUT): Promise<OUTPUT>
}