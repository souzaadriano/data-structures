export interface EngineContract {
    readonly name: string
    readonly message: string
    init(): Promise<void>
}