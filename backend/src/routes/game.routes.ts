import { Router } from "express";
import { addGame, getGames, getGamesById, getGamesByName, getLatestGames } from "@/controllers/game.controller";
import { validateSchema } from "@/middlewares/validateSchema.middleware";
import { gameSchema } from "@/schemas/game.schema";

const gameRoutes = Router();

gameRoutes
    .get('/', getGames)
    .get('/popular', getLatestGames)
    .get('/:id', getGamesById)
    .get('/game/:title', getGamesByName)


export default gameRoutes;