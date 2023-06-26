import { Request, Response, NextFunction } from "express";
import reviewService from "@/services/review.service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";

export async function getReviews(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await reviewService.getReviews();
    return res.send(reviews);
  } catch (err) {
    next(err)
  }
}

export async function makeReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { review, grade } = req.body;
  const { game_id } = req.params;
  const { userId } = req;

  try {
    console.log('1')
    const entry = await reviewService.postReview(Number(game_id), Number(userId), review, grade)
    console.log('2')
    return res.send(entry);
  } catch (err) {
    next(err)
  }
}

export async function getReviewByGame(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const reviews = await reviewService.getReviewsByGameId(Number(id));

    return res.send(reviews);
  } catch (err) {
    next(err)
  }
}

export async function getReviewByUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req);

  try {
    const reviews = await reviewService.getReviewByUserId(userId);

    return res.send(reviews)
  } catch (err) {
    next(err)
  }
}

export async function editReview(req: Request, res: Response, next: NextFunction) {
  const review = req.body;
  const userId = Number(req);
  const id = Number(req.params)

  try {
    const editedReview = await reviewService.editReview(id, userId, review);

    return res.send(editedReview);
  } catch (err) {
    next(err);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params);
  const userId = Number(req);

  try {
    await reviewService.deleteReview(id, userId);

    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}