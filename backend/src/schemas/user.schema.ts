import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    image: joi.string().required(),
    password: joi.string().required(),
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});