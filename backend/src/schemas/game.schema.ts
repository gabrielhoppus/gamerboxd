import joi from "joi";

export const gameSchema = joi.object({
    id: joi.number().positive().required(),
});