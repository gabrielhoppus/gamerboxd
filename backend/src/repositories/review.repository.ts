import prisma from "@/config/database.connection";

async function findAllReviews(){
    return await prisma.review.findMany({
        include: {
            User: {
                select: {
                    name: true,
                }
            }
        }
    });
}

type ReviewEntity = {
    game_id: number,
    user_id: number,
    review: string,
    grade: number,
}

async function makeReview(game_id: number, user_id: number, review: string, grade: number){
    return await prisma.review.create({
        data: {
            game_id,
            user_id,
            review,
            grade
        }
    })
}

export const reviewRepository = {
    findAllReviews,
    makeReview
}