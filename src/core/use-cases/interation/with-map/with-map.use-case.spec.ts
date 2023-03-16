import { WithMapUseCase } from "./with-map.use-case";

describe('with-map.use-case', () => {
    let sut: WithMapUseCase;
  
    beforeEach(() => {
      sut = new WithMapUseCase({});
    });
  
    it('shoud be defined', () => {
      expect(sut).toBeDefined();
    });
})
