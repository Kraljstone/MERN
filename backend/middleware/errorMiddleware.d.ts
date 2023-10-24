import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './errorMIddleware.interface';
export declare const notFound: (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
export declare const errorHandler: (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
