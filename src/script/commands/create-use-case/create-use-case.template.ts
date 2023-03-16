const useCaseTemplate =
`import { UseCaseContract } from "@/shared/use-case.contract";

export class {{className}}UseCase implements UseCaseContract<Input, Output> {
    constructor(private readonly dependencies: Dependencies) {}

    public async execute(input: Input): Promise<Output> {
        return {}
    }
}

type Input = {}
type Output = {}
type Dependencies = {}`
const useCaseFactoryTemplate =
`import { {{className}}UseCase } from "./{{name}}.use-case";

export class {{className}}UseCaseFactory {
    private constructor() {}

    static factory() {
        return new {{className}}UseCase({})
    }
}
`
const useCaseTestTemplate =
`import { {{className}}UseCase } from "./{{name}}.use-case";

describe('{{name}}.use-case', () => {
    let sut: {{className}}UseCase;
  
    beforeEach(() => {
      sut = new {{className}}UseCase({});
    });
  
    it('shoud be defined', () => {
      expect(sut).toBeDefined();
    });
})
`
const useCaseExceptionTemplate =
`import { Exception, ExtendsConstructor, EXCEPTION_TYPE } from '@/shared/exception.entity';

export class {{className}}UseCaseBaseException extends Exception {
  constructor(input: ExtendsConstructor) {
    super({
      context: 'use-case.{{name}}',
      message: input.message,
      data: input.data,
      error: input.error,
      type: input.type,
    });
  }
}
`
export type CreateUseCaseTemaplte = {
  useCaseTemplate: string;
  useCaseFactoryTemplate: string;
  useCaseTestTemplate: string;
  useCaseExceptionTemplate: string;
}

export const createUseCaseTemaplte = {
  useCaseTemplate,
  useCaseFactoryTemplate,
  useCaseTestTemplate,
  useCaseExceptionTemplate
}