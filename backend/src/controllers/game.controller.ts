import { NewGame } from "@/protocols/game.protocols.js";
import gameService from "@/services/game.service";
import { Request, Response, NextFunction } from "express";

export async function getGames(req: Request, res: Response, next: NextFunction) {
    try {
        const games = await gameService.getAllGames();
        return res.send(games);
    } catch (err) {
        next(err)
    }
}

export async function addGame(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params)
    try {
        await gameService.addGame(id);
        return res.sendStatus(201);
    } catch (err) {
        next(err)
    }
}

export async function getGamesById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params);

    try {
        const game = await gameService.getGameById(id);
        return res.send(game);
    } catch (err) {
        next(err)
    }
}

export async function getGamesByName(req: Request, res: Response, next: NextFunction) {
    const { title } = req.params;

    try {
        const games = await gameService.getGameByName(title);
        return res.send(games)
    } catch (err) {
        next(err)
    }
}

export async function getLatestGames(req: Request, res: Response, next: NextFunction) {
    try {
        const games = await gameService.getLatestGames();
        return res.send(games);
    } catch (err) {
        next(err)
    }
}