import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import prisma from '@/config/database.connection';
import { NewUser, UserEntity } from '@/protocols/user.protocol';
import { NewLogin } from '@/protocols/user.protocol';

export async function createUser(params: Partial<UserEntity> = {}) {
  const incomingPassword = params.password || faker.internet.password(6);

  return await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: params.email || faker.internet.email(),
      image: faker.image.imageUrl(),
      password: incomingPassword,
    },
  });
}

export async function loginUser(token: string, userId: number) {
  return await prisma.session.create({
    data: {
      token,
      userId,
    }
  })
}