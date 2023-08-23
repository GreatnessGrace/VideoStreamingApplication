import { Request, Response, NextFunction } from "express";
import Joi, { ValidationError } from 'joi';
import { makeResponse, statusCode } from '../../../lib';

export const addVideoJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        userId: Joi.string().required(),
        title: Joi.string().required(),
        desc: Joi.string().optional(),
        imgUrl: Joi.string().required(),
        videoUrl: Joi.string().required(),
        tags: Joi.string().optional(),      
    }).validate(req.body);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

 export const updateVideoJoi = (req: Request, res: Response, next: NextFunction) => {
    const bodySchema = Joi.object({
        userId: Joi.string().optional(),
        title: Joi.string().optional(),
        desc: Joi.string().optional(),
        imgUrl: Joi.string().optional(),
        videoUrl: Joi.string().optional(),
        tags: Joi.string().optional(), 
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

export const deleteVideoJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        id : Joi.string()
        .hex()
        .required()
    }).validate(req.params);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

export const subscribedVideoJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        id : Joi.string()
        .hex()
        .required()
    }).validate(req.params);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

export const getVideoJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        id : Joi.string()
        .hex()
        .required()
    }).validate(req.params);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

export const addViewJoi = (req:Request, res: Response, next:NextFunction)=>{
    const { error } = Joi.object()
    .keys({
        id : Joi.string()
        .hex()
        .required()
    }).validate(req.params);
    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

export const getTagVideosJoi = (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object({
        tags: Joi.string().required()
    }).validate(req.query);

    if(error){
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message, undefined);
    }
    next();
 }

 
export const searchVideosJoi = (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.object({
        q: Joi.string().required()
    }).validate(req.query);

    if (error) {
        return makeResponse(req, res, statusCode.badRequest, false, error.details[0].message);
    }
    next();
};
