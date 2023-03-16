import { Handler } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
type Constructor<T extends {} = {}> = new (...args: any[]) => T;

export const inputValidatorMiddleware =
  (input: Constructor): Handler =>
  async (request, response, next) => {
    const data = { ...request.body, ...request.query, ...request.params };
    const entity = plainToInstance(input, data);
    const errors = await validate(entity);
    request.input = entity;
    if (errors.length === 0) return next();
    return response.status(400).json({ ok: false, errors });
  };
