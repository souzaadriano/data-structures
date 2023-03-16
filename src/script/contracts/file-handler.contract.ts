export interface FileHandlerContract {
    createFile(input: CreateFileInput): Promise<void>
    createDirectory(input: CreateFolderInput): Promise<void>
}

export type CreateFileInput = {
    path: string
    data: string
}

export type CreateFolderInput = {
    path: string
}