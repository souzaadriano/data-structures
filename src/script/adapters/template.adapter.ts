import { JsonDocument } from "@/shared/json.type";
import { RenderInput, TemplateContract } from "../contracts/template.contract";
import mustache from 'mustache'

export class Template implements TemplateContract {
    public async render<T extends JsonDocument = JsonDocument>(input: RenderInput<T>): Promise<string> {
        const { data, template } = input
        const payload = mustache.render(template, data)
        return payload
    }
}