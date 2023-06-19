import supertest from "supertest";
import app, { init } from '@/app';
import { faker } from '@faker-js/faker';
import { createUser, loginUser } from "../factories/users-factory";
import { cleanDb } from "../helper";
import httpStatus from "http-status";
import * as jwt from 'jsonwebtoken';
import prisma from '@/config/database.connection';
import bcrypt from 'bcrypt';

const api = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('GET /users', () => {
  it('should respond with status 401 if no token is given', async () => {
    const result = await api.get('/users');
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const result = await api.get('/users').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.SECRET_KEY);

    const result = await api.get('/users').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and an array of users if there are users registered', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
      await loginUser(token, user.id)

      const result = await api.get('/users').set('Authorization', `Bearer ${token}`)
      expect(result.status).toEqual(httpStatus.OK)
      expect(result.body).toEqual([
        {
          id: user.id,
          name: user.name,
        }
      ])
    });
  });
});

describe('POST /users/signup', () => {
  it('should respond with status 201 on creating a valid user', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const password = faker.internet.password();

    const result = await api.post('/users/signup').send({ name, email, image, password })

    expect(result.status).toEqual(httpStatus.CREATED)
  });
  it('should respond with status 409 when creating an user with duplicated email', async () => {
    const user = await createUser();
    const name = user.name;
    const email = user.email;
    const password = user.password;

    const result = await api.post('/users/signup').send({ name, email, password });

    expect(result.status).toEqual(httpStatus.CONFLICT)
  });
});

describe('PUT /users/signin', () => {
  it('should respond with status 200 and user token when successfuly logged in', async () => {
    const user = await createUser();
    const body = {
      email: user.email,
      password: user.password,
    }

    const result = await api.post('/users/signin').send(body);

    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual(
      {
        token: expect.any(String),
        User: {
          name: user.name,
          image: user.image
        }
      }
    )

  });
  it('should respond with status 401 if user is not registered', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const result = await api.put('/users/signin').send({ email, password });

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });
  it('should respond with status 401 if password is wrong', async () => {
    const user = await createUser();
    const email = user.email;
    const password = faker.internet.password();

    const result = await api.put('/users/signin').send({ email, password });

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });
});

describe('DELETE /users/delete/:id', () => {
  it('should respond with status 204 when an user is deleted', async () => {
    const user = await createUser();
    const result = await api.delete(`/users/delete/${user.id}`)
    expect(result.status).toEqual(204);
  });
  it('should respond with status 404 when an user id is not found', async () => {
    const id = faker.random.numeric();
    const result = await api.delete(`/users/delete/${id}`)
    expect(result.status).toEqual(404);
  });
  it('should respond with 500 when an user id is not numeric', async () => {
    const id = faker.lorem.word();
    const result = await api.delete(`/users/delete/${id}`)
    expect(result.status).toEqual(500);
  });
});