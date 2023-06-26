import { Router } from "express";
import { makeReview, getReviews, getReviewByGame, getReviewByUser, editReview, deleteReview } from "@/controllers/review.controller";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const reviewRouter = Router();

reviewRouter
    .post('/add/:game_id', authenticateToken, makeReview)
    .get('/', getReviews)
    .get('/:id', getReviewByGame)
    .get('/user/:userId', getReviewByUser)
    .put('/:id', editReview)
    .delete('/:id', deleteReview);

export default reviewRouter;