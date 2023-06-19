import errors from "@/errors/index";
import { reviewRepository } from "@/repositories/review.repository";
import gameService from "./game.service";


async function postReview(game_id: number, user_id: number, review: string, grade: number){
    const entry = await reviewRepository.makeReview(game_id, user_id, review, grade);
    await gameService.addGame(game_id)

    return entry;
}

async function getReviews(){
    const reviews = await reviewRepository.findAllReviews();
    if (!reviews) throw errors.notFoundError();

    return reviews
}

async function getReviewsByGameId(game_id: number) {
    const reviews = await reviewRepository.getReviewByGameId(game_id);

    return reviews
}

async function getReviewByUserId(user_id: number){
    const reviews = await reviewRepository.getReviewByUserId(user_id);

    return reviews
}

async function checkUserReviewById(id: number, user_id: number) {
    const check = await reviewRepository.checkReview(id, user_id);

    return check;
}

async function editReview(id: number, user_id: number, review: string){
    const check = checkUserReviewById(id, user_id);
    if(!check) return errors.unauthorizedError();

    const editedReview = await reviewRepository.editReview(id, review);

    return editedReview;
}

async function deleteReview(id: number, user_id: number){
    const check = checkUserReviewById(id, user_id);
    if(!check) return errors.unauthorizedError();

    await reviewRepository.deleteReview(id);
}

export default {
    getReviews,
    postReview,
    getReviewsByGameId,
    getReviewByUserId,
    editReview,
    deleteReview
}