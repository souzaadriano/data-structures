import { CLIInput } from '@/script/adapters/cli-input.adapter'
import { CreateUseCase } from './create-use-case.use-case'
import { FileHandler } from '@/script/adapters/file-handler.adapter'
import { Template } from '@/script/adapters/template.adapter'
import { createUseCaseTemaplte } from './create-use-case.template'
async function run() {
    const useCase = new CreateUseCase({
        fileHandler: new FileHandler(),
        templateHandler: new Template(),
        templates: createUseCaseTemaplte
    })
    const BASE_PATH = `${process.cwd()}/src/core/use-cases`
    const cliInput = new CLIInput()
    const input = await cliInput.inputString('module/name to new use-case')
    const [moduleName, name] = input.split('/')

    await useCase.execute({
        path: `${BASE_PATH}/${moduleName}/${name}`,
        name: name
    })
}

run().catch(console.error)