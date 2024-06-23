import { Router } from "express";
import {
  createUserController,
  getUsersController,
} from "../controller/user.controller";
import { SignUpUserInput, signUpUserSchema } from "../schema/user.schema";
import validateResource from "../middlewares/validate-resource.middleware";

const router = Router();

router.get("/", getUsersController);

router.post(
  "/signup",
  validateResource(signUpUserSchema),
  createUserController
);

export default router;
