import { Router } from "express";
import { createUserController, getUsersController } from "../controller/user.controller";

const router = Router()

router.get('/', getUsersController);

router.post('/signup', createUserController);

export default router;