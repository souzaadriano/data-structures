import { NextFunction, Request, Response } from 'express';
import { ExceptionHandler } from './exception.handler';

const exception = new ExceptionHandler();
export const errorHandler = async (error: any, request: Request, response: Response, next: NextFunction) => {
  const { status, message } = await exception.handle(error);

  return response.status(status).json({ message });
};
