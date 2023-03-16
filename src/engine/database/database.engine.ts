import { Knex, knex } from 'knex';
import { DatabaseConfig } from './database.config';
import { Singleton } from '@/shared/singleton.decorator';
import { EngineContract } from '../engine.contract';

@Singleton
export class DatabaseEngine implements EngineContract {
  private config = new DatabaseConfig();
  private connection?: Knex;
  readonly name = 'DATABASE';
  get message() {
    return `[DATABASE]: Connected on ${this.config.host} database ${this.config.name}`;
  }

  private connect() {
    this.connection = knex({
      client: 'pg',
      connection: {
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.name,
      },
    });
  }

  async init(): Promise<void> {
    if (this.connection) return;
    this.connect();
  }

  public get use(): Knex {
    if (this.connection) return this.connection;
    throw new Error();
  }

  public async raw<T>(input: RawInput) {
    return await this.use.raw<RawQuery<T>>(input.sql, input.params ?? []);
  }
}

export type RawInput = {
  sql: string;
  params?: any[];
};

export type RawQuery<T> = {
  command: string;
  rowCount: number;
  rows: T[];
};
