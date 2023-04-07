import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter = Router();

const userController = new UserController();

userRouter.get("/user/:id", userController.getUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.delete("/users/:id", userController.withdraw);
