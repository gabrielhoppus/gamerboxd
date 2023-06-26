import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    image: joi.string().uri().required(),
    password: joi.string().min(4).required(),
    confirmation: joi.string().valid(joi.ref("password")).required()
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});