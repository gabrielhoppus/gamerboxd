import * as jwt from 'jsonwebtoken';
import { NewLogin, UserEntity } from "@/protocols/user.protocol";
import { createUser, loginUser } from './factories/users-factory';
import "dotenv/config"

import prisma from '@/config/database.connection';

export async function cleanDb() {
    await prisma.reviews.deleteMany({});
    await prisma.users.deleteMany({});
    await prisma.games.deleteMany({});

}

export async function generateValidToken(user: UserEntity) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id}, process.env.SECRET_KEY);

    await loginUser(token, incomingUser.id);

    return token;
}
