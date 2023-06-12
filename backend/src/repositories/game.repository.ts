import prisma from "@/config/database.connection";


async function findGame(id: number) {
    return await prisma.game.findFirst({
        where: { id }
    })
}

async function findAllGames(){
    return await prisma.game.findMany();
}


async function addGame(id: number, title: string, released: string) {
    return await prisma.game.upsert({
        where: { id },
        update: {},
        create: {
            id,
            title,
            release_date: released,
        }
    })
}

export const gameRepository = {
    addGame,
    findGame,
    findAllGames
}