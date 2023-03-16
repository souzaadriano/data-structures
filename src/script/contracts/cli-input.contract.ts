export interface CLIInputContract {
    inputString(message: string): Promise<string>
}