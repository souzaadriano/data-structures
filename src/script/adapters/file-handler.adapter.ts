import { CreateFileInput, CreateFolderInput, FileHandlerContract } from "../contracts/file-handler.contract";

import { writeFile, mkdir } from 'fs/promises'

export class FileHandler implements FileHandlerContract {
    async createFile(input: CreateFileInput): Promise<void> {
        const { data, path } = input
        console.log('creating file', {path, data})
        await writeFile(path, data, { encoding: 'utf-8' })
    }
    async createDirectory(input: CreateFolderInput): Promise<void> {
        const { path } = input
        await mkdir(path, {recursive: true})
    }
}