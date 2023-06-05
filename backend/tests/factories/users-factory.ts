import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import prisma from '@/config/database.connection';
import { NewUser, UserEntity } from '@/protocols/user.protocol';
import { NewLogin } from '@/protocols/user.protocol';

export async function createUser(params: Partial<UserEntity> = {}) {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

export async function loginUser(token: string, id: number) {
  return await prisma.session.update({
    where: {
        id,
    },
    data: {
        token,
    }
})
}