import { EngineContract } from './engine.contract';
export class Application {
  private static engines: Map<string, EngineContract> = new Map();
  private constructor() {}

  public static use(engine: EngineContract) {
    if (this.engines.has(engine.name)) throw new Error();
    this.engines.set(engine.name, engine);
    return Application;
  }

  public static async start() {
    this.init();
  }

  private static async init() {
    const engines = [...this.engines.values()];
    const initPromises = engines.map(async (engine) => {
      await engine.init();
      console.log(`[${engine.name.toUpperCase()}]: ${engine.message}`);
    });
    await Promise.all(initPromises);
  }
}
