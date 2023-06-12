import { Router } from "express";
import { addGame, getGames } from "@/controllers/game.controller";
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { gameSchema } from "@/schemas/game.schema";

const gameRoutes = Router();

gameRoutes
    .post('/add', validateSchema(gameSchema), addGame)
    .get('/', getGames)

export default gameRoutes;