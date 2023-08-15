import { Request, Response } from "express";

type T = Awaited<Promise<PromiseLike<object | null | number>>>
const makeResponse = (req: Request, res: Response, statusCode: number, success: boolean, message: string, payload?: object | null, meta?: object) =>
  new Promise<T>(resolve => {
    res.status(statusCode)
      .send({
        success,
        message,
        data: payload,
        meta: meta !== undefined ? meta : "",
      });
    resolve(statusCode);
  });

export { makeResponse };
