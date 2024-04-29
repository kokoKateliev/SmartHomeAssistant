import { Router } from "express";
import userRouter from "./user.routes"; 
import familyRouter from "./family.routes"; 
import roomRouter from "./room.routes"; 
import deviceRouter from "./device.routes"; 

const router = Router();

router.use('/user', userRouter);
router.use('/family', familyRouter);
router.use('/room', roomRouter);
router.use('/device', deviceRouter);

export default router;