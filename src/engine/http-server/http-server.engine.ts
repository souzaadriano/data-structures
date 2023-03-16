import 'express-async-errors';
import { HttpServerConfig } from './http-server.config';
import { json } from 'express';
import { Server } from '@overnightjs/core';
import cors from 'cors';
import { factoryControllers } from './routes/routes';
import { EngineContract } from '../engine.contract';

export class HttpServerEngine extends Server implements EngineContract {
  private readonly config = new HttpServerConfig();
  readonly name = 'HTTP_SERVER';
  readonly controllers = factoryControllers();

  constructor() {
    super(true);
    this.app.use(cors());
    this.app.use(json());
  }

  get message() {
    return `[HTTP_SERVER]: started at port ${this.config.port}`
  }

  private setupRoutes() {
    this.addControllers(this.controllers);
  }

  async init(): Promise<void> {
    this.setupRoutes();
    this.app.listen(this.config.port, () => {});
  }
}
