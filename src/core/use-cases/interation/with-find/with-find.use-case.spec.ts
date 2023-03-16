import { WithFindUseCase } from "./with-find.use-case";

describe('with-find.use-case', () => {
    let sut: WithFindUseCase;
  
    beforeEach(() => {
      sut = new WithFindUseCase({});
    });
  
    it('shoud be defined', () => {
      expect(sut).toBeDefined();
    });
})
