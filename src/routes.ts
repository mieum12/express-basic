import { Router } from "express";
import { UserController } from "./user/user.controller";
import { PostController } from "./posts/posts.controller";

export const userRouter = Router();
export const postRouter = Router();

const userController = new UserController();
const postController = new PostController();

userRouter.get("/me", userController.getUser);
userRouter.get("/user/:id", userController.getUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.delete("/users/:id", userController.withdraw);
// userRouter.put("/users", userController.update);

postRouter.post("/posts", postController.write);
postRouter.put("/posts/:id", postController.edit);
postRouter.delete("/posts/:id", postController.delete);
postRouter.get("/posts/:id", postController.getById);
postRouter.get("/posts", postController.getAll);
