import { Request, Response , NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

import { makeResponse, statusCode } from '../../../lib';

export const signupJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        photo: Joi.string().optional(),
        password: Joi.string().required()
        
    }).validate(req.body);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }
export const loginJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        email: Joi.string().required(),
        password: Joi.string().required()
        
    }).validate(req.body);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

 export const updateUserJoi  = (req: Request, res: Response, next: NextFunction) =>{
    const {  error } = Joi.object()
    .keys({
        _id: Joi.string()
        .hex()
        .required(),
        name: Joi.string()
        .optional(),
        photo: Joi.string()
        .optional(),
      email: Joi.string()
        .email()
        .optional(),
    })
    .validate(req.body);
    if (error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

 export const deleteUserJoi = (req: Request, res: Response, next: NextFunction) =>{
    const { error } = Joi.object()
    .keys({
        _id : Joi.string()
        .hex()
        .required()
    }).validate(req.body);
    if(error){   return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }


 export const getUserJoi = (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object()
    .keys({
        _id : Joi.string()
        .hex()
        .required()
    }).validate(req.body);
    if(error){   return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

 export const subscribeUserJoi = (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = Joi.object({
      _id: Joi.string().hex().required(),
    });
  
    const paramsSchema = Joi.object({
      id: Joi.string().hex().required(),
    });
  
    const { error: bodyError } = bodySchema.validate(req.body);
    const { error: paramsError } = paramsSchema.validate(req.params);
  
    if (bodyError || paramsError) {
      const validationError = bodyError || paramsError as ValidationError;
      return makeResponse(req, res, statusCode.badRequest, false, validationError.details[0].message, undefined);
    } 
    next();
  };

 export const unsubscribptionJoi = (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = Joi.object({
      _id: Joi.string().hex().required(),
    });
  
    const paramsSchema = Joi.object({
      id: Joi.string().hex().required(),
    });
  
    const { error: bodyError } = bodySchema.validate(req.body);
    const { error: paramsError } = paramsSchema.validate(req.params);
  
    if (bodyError || paramsError) {
      const validationError = bodyError || paramsError as ValidationError;
      return makeResponse(req, res, statusCode.badRequest, false, validationError.details[0].message, undefined);
    } 
    next();
  };
  