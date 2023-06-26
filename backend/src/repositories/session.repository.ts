import prisma from "@/config/database.connection";

async function findSessionByUserId(userId: number) {
    return await prisma.session.findFirst({
        where: {
            userId,
        }
    })
}

const sessionRepository = {
    findSessionByUserId,
}

export default sessionRepository;