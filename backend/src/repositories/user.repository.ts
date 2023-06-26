import { NewUser, NewUserEntity } from "@/protocols/user.protocol";
import prisma from "@/config/database.connection";


async function findByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

async function createUser( user : NewUserEntity) {
    return await prisma.user.create({
        data: user
    });
}

    async function findUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }

    async function loginUser(token: string, userId: number) {
        return await prisma.session.upsert({
            where: {
                userId,
            },
            create: {
                userId,
                token
            }, 
            update: {
                token
            },
            select: {
                token: true,
                User: {
                    select: {
                        name: true,
                        image: true,
                    }
                }
            }
        })
    }

    async function findById(id: number) {
        return await prisma.user.findFirst({
            where: {
                id,
            }
        })
    }

    async function deleteUser(id: number) {
        return await prisma.user.delete({
            where: {
                id,
            }
        })
    }

const userRepository = {
    findByEmail,
    createUser,
    findUsers,
    loginUser,
    deleteUser,
    findById,
}

export default userRepository;