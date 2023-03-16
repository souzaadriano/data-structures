import { JsonDocument } from "@/shared/json.type";

export interface TemplateContract {
    render<T extends JsonDocument>(input: RenderInput<T>): Promise<string>
}

export type RenderInput<T extends JsonDocument> = {
    template: string
    data: T
}