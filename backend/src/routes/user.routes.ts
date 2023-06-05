import { Router } from "express";
import { createUser, loginUser, getUsers, deleteUser } from "@/controllers/user.controller"
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { loginSchema, userSchema } from "@/schemas/user.schema";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const userRoutes = Router();

userRoutes
    .post('/signup', validateSchema(userSchema), createUser)
    .post('/signin', validateSchema(loginSchema), loginUser)
    .get('/', authenticateToken, getUsers)
    .delete('/delete/:id', authenticateToken, deleteUser)

export default userRoutes; 