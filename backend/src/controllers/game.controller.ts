import { NewGame } from "@/protocols/game.protocols.js";
import gameService from "@/services/game.service";
import { Request, Response, NextFunction } from "express";

export async function addGame(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body;
        await gameService.addGame(id);
        return res.sendStatus(201);
    } catch (err) {
        next(err)
    }
}

export async function getGames(req: Request, res: Response, next: NextFunction){
    try {
        const games = await gameService.getAllGames();
        return res.send(games);
    } catch (err) {
        next(err)
    }
}