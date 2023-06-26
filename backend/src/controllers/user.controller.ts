import userService from "@/services/user.service";
import { Request, Response, NextFunction } from "express";
import { NewLogin, NewUser, checkId } from "@/protocols/user.protocol";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";


export async function createUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { name, email, image, password, confirmation } = req.body as NewUser;
    try {
        await userService.createUser({ name, email, image, password, confirmation });
        return res.sendStatus(httpStatus.CREATED);
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const users = await userService.findUsers();
    return res.send(users)
}

export async function loginUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body as NewLogin;

    try {
        const token = await userService.loginUser({ email, password });

        return res.status(httpStatus.OK).send(token)
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { userId } = req;
    
    try {
        await userService.deleteUser(Number(id), Number(userId))
        return res.sendStatus(httpStatus.NO_CONTENT)
    } catch (err) {
        next(err);
    }
}