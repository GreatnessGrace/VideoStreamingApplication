import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { statusCode, IReqUser } from '../../lib';

interface ExtendedRequest extends Request {
    user?: any; // Change 'string' to the actual type of your user object
}

export const verifyToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    verify(
        String(req.cookies.token),
    String(process.env.SECRET_KEY),
    (err, decoded) =>{
        if(err)  {
            return res
            .status(statusCode.unauthorized)
            .send({
                status: false,
                message: 'Unauthorized'
            });
        }
        req.user = (decoded as IReqUser).user;
        next();
    })
}