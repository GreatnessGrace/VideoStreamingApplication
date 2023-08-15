import { Router } from "express";
import {  authRouter, userRouter } from '../controllers'
import { verifyToken } from "../middlewares";
const router = Router();
router.use("/auth", authRouter);
router.use('/user', verifyToken, userRouter);
export { router };