import { Router } from "express";
import { createUser, loginUser, getUsers, deleteUser } from "@/controllers/user.controller"
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { loginSchema, userSchema } from "@/schemas/user.schema";

const userRoutes = Router();

userRoutes
    .post('/signup', validateSchema(userSchema), createUser)
    .put('/signin', validateSchema(loginSchema), loginUser)
    .get('/', getUsers)
    .delete('/delete/:id', deleteUser)

export default userRoutes; 