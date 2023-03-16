import { GeneratorContract } from './generator.contract';

import { randomUUID } from 'crypto';

export class Generator implements GeneratorContract {
  uuid(): string {
    return randomUUID();
  }
}
