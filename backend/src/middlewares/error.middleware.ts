import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "protocols/error.protocols";

export function handleApplicationErrors(err : ApplicationError , req : Request, res : Response, next : NextFunction) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError" || err.name === "DuplicatedGameError") {
        return res
            .status(httpStatus.CONFLICT)
            .send({ message: err.message, email: err.email });
    }

    if (err.name === "InvalidCredentialsError") {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: err.message,
        });
    }

    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({
            message: err.message,
        });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}