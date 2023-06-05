import err from "@/errors/index";
import joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateSchema(schema : joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            throw err.conflictError(errors);
        }

        next();
    };
}