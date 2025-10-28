import { Request, Response, NextFunction, RequestHandler } from "express";

// =======   HIGHER ORDER FUNCTION  ===========//
export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
