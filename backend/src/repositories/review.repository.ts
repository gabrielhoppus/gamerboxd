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

async function getReviewByGameId(game_id: number){
    return await prisma.review.findMany({
        where:{
            game_id
        }
    })
}

async function getReviewByUserId(user_id: number){
    return await prisma.review.findMany({
        where:{
            user_id
        }
    })
}

async function editReview(id: number, review: string){
    return await prisma.review.update({
        where: {
            id
        },
        data: {
            review
        },
        select: {
            review: true,
            Game: {
                select: {
                    title: true,
                }
            },
            User: {
                select: {
                    name: true,
                }
            }
        }
    })
}

async function checkReview(id: number, user_id: number){
    return await prisma.review.findFirst({
        where: {
            id,
            user_id
        }
    })
}

async function deleteReview(id: number){
    return await prisma.review.delete({
        where: {
            id
        }
    })
}

export const reviewRepository = {
    findAllReviews,
    makeReview,
    getReviewByGameId,
    getReviewByUserId,
    editReview,
    deleteReview,
    checkReview
}