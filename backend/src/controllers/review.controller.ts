import { Request, Response, NextFunction } from "express";
import reviewService from "@/services/review.service";

export async function getReviews(req: Request, res: Response, next: NextFunction) {
    try {
        const reviews = await reviewService.getReviews();
        return res.send(reviews);
    } catch (err) {
        next(err)
    }
}

export async function makeReview(req: Request, res: Response, next: NextFunction) {
    try {
        const { review, grade } = req.body;
        const game_id = Number(req.params.game_id);
        const user_id = Number(req.query.user_id);

        console.log(review, grade, game_id, user_id)

        const entry = await reviewService.postReview(game_id, user_id, review, grade)

        return res.send(entry);
    } catch (err) {
        next(err)
    }
}