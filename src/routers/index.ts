import { Router } from "express";
import {  authRouter, userRouter } from '../controllers'
import { verifyToken } from "../middlewares";
import { publicVideoController } from "../controllers/videos/public";
import { protectedVideoController } from "../controllers/videos/protected";
const router = Router();
router.use("/auth", authRouter);
router.use('/user', verifyToken, userRouter);
router.use('/videos', publicVideoController)
router.use('/videos',verifyToken, protectedVideoController)
export { router };