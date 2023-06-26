import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import prisma from '@/config/database.connection';
import { NewUser, UserEntity } from '@/protocols/user.protocol';
import { NewLogin } from '@/protocols/user.protocol';

export async function createUser(params: Partial<UserEntity> = {}) {
  const incomingPassword = params.password || faker.internet.password(6);
  const password = await bcrypt.hash(incomingPassword, 10);
  const name = faker.name.fullName();
  const image = faker.image.imageUrl();
  const email = faker.internet.email();
  const userInfo = {email: email, password: incomingPassword, name: name, image: image}

  const login = await prisma.user.create({
    data: {
      name,
      email,
      image,
      password,
    },
  });

  const loginInfo = {login: login, user: userInfo}

  return loginInfo
}

export async function loginUser(token: string, userId: number) {
  return await prisma.session.create({
    data: {
      token,
      userId,
    }
  })
}