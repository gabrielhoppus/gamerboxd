import { NewUser } from "@/protocols/user.protocol";
import prisma from "@/config/database.connection";


async function findByEmail(email: string) {
    return await prisma.users.findUnique({
        where: {
            email
        }
    })
}

async function createUser( user : NewUser) {
    return await prisma.users.create({
        data: user
    });
}

    async function findUsers() {
        return await prisma.users.findMany({
            select: {
                id: true,
                name: true,
            }
        });
    }

    async function loginUser(token: string, id: number) {
        return await prisma.users.update({
            where: {
                id,
            },
            data: {
                token,
            }
        })
    }

    async function findById(id: number) {
        return await prisma.users.findUnique({
            where: {
                id,
            }
        })
    }

    async function deleteUser(id: number) {
        return await prisma.users.delete({
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