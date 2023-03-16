import { CLIInputContract } from "../contracts/cli-input.contract";
import { question } from 'readline-sync'

export class CLIInput implements CLIInputContract {
    async inputString(message: string): Promise<string> {
        return question(`${message}\n`)
    }
}
