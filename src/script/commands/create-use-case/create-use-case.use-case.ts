import { UseCaseContract } from "@/shared/use-case.contract";
import { FileHandlerContract } from "../../contracts/file-handler.contract";
import { TemplateContract } from "../../contracts/template.contract";
import { CreateUseCaseTemaplte } from "./create-use-case.template";
import { CLIInputContract } from "../../contracts/cli-input.contract";

export class CreateUseCase implements UseCaseContract<Input, void> {
    constructor(private readonly dependencies: Dependencies) {}

    async execute(input: Input): Promise<void> {
        const { fileHandler } = this.dependencies
        const { name, path } = input
        await fileHandler.createDirectory({ path })
        const className = this.makeClassName(name)
        console.log({className})
        const { exception, factory, test, useCase } = await this.renderTemplates(name, className)
        await this.createFiles(path, name, exception, factory, test, useCase)
    }

    private async renderTemplates(name: string, className: string) {
        const { templateHandler, templates } = this.dependencies
        const [ useCase, factory, test, exception ] = await Promise.all([
            templateHandler.render({
                template: templates.useCaseTemplate,
                data: { className }
            }),
            templateHandler.render({
                template: templates.useCaseFactoryTemplate,
                data: { name, className }
            }),
            templateHandler.render({
                template: templates.useCaseTestTemplate,
                data: { name, className }
            }),
            templateHandler.render({
                template: templates.useCaseExceptionTemplate,
                data: { name, className }
            })
        ])

        return { useCase, factory, test, exception }
    }

    private async createFiles(path: string, name: string, exception: string, factory: string, test: string, useCase: string) {
        const { fileHandler } = this.dependencies
        await Promise.all([
            fileHandler.createFile({
                data: exception,
                path: `${path}/${name}.exception.ts`
            }),
            fileHandler.createFile({
                data: useCase,
                path: `${path}/${name}.use-case.ts`
            }),
            fileHandler.createFile({
                data: test,
                path: `${path}/${name}.use-case.spec.ts`
            }),
            fileHandler.createFile({
                data: factory,
                path: `${path}/${name}.factory.ts`
            })
        ])
    }

    private makeClassName(name: string) {
        const splitedName = name.split('-')
        const className = splitedName.map(chunk =>  `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`).join('')
        return className
    }
}

type Input = {
    name: string
    path: string
}

type Dependencies = {
    fileHandler: FileHandlerContract
    templateHandler: TemplateContract
    templates: CreateUseCaseTemaplte
}