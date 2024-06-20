import { Router } from "express";
import userRouter from "./user.routes"; 
import familyRouter from "./family.routes"; 
import roomRouter from "./room.routes"; 
import deviceRouter from "./device.routes"; 

const router = Router();

router.use('/users', userRouter);
router.use('/families', familyRouter);
router.use('/rooms', roomRouter);
router.use('/devices', deviceRouter);

export default router;