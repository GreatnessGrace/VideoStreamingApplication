import { Request, Response, NextFunction } from "express";
import { makeResponse, statusCode } from '../../lib';
export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return makeResponse(req, res, statusCode.badRequest, false, 'User not found')
  }

  return next();
}

