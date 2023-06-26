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
    const token = jwt.sign({ userId: userWithoutSession.login.id }, process.env.SECRET_KEY);

    const result = await api.get('/users').set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and an array of users if there are users registered', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.login.id }, process.env.SECRET_KEY);
      await loginUser(token, user.login.id)

      const result = await api.get('/users').set('Authorization', `Bearer ${token}`)
      expect(result.status).toEqual(httpStatus.OK)
      expect(result.body).toEqual([
        {
          id: user.login.id,
          name: user.login.name,
        }
      ])
    });
  });
});

describe('POST /users/signup', () => {
  it('should respond with status 409 when no body is given', async () => {
    const result = await api.post('/users/signup');

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"name\" is required",
        "\"email\" is required",
        "\"image\" is required",
        "\"password\" is required",
        "\"confirmation\" is required",
      ]
    })
  });

  it('should respond with status 409 when no name is given', async () => {
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const password = faker.internet.password();
    const confirmation = password;
    const result = await api.post('/users/signup').send({ email, image, password, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"name\" is required",
      ]
    })
  });

  it('should respond with status 409 when no email is given', async () => {
    const name = faker.name.fullName();
    const image = faker.image.imageUrl();
    const password = faker.internet.password();
    const confirmation = password;
    const result = await api.post('/users/signup').send({ name, image, password, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"email\" is required",
      ]
    })
  });

  it('should respond with status 409 when no image is given', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const confirmation = password;
    const result = await api.post('/users/signup').send({ name, email, password, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"image\" is required",
      ]
    })
  });

  it('should respond with status 409 when no password is given', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const confirmation = faker.internet.password();
    const result = await api.post('/users/signup').send({ name, email, image, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"password\" is required",
        "\"confirmation\" must be [ref:password]",
      ]
    })
  });
  
  it('should respond with status 409 when no password confirmation is given', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const password = faker.internet.password(4)
    const result = await api.post('/users/signup').send({ name, email, image, password })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"confirmation\" is required",
      ]
    })
  });

  it('should respond with status 409 when password is not in a valid format', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const password = faker.internet.password(3)
    const confirmation = password;

    const result = await api.post('/users/signup').send({ name, email, image, password, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"password\" length must be at least 4 characters long"
      ]
    })
  });

  it('should respond with status 409 when image is not in a valid format', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.name.fullName();
    const password = faker.internet.password(4)
    const confirmation = password;

    const result = await api.post('/users/signup').send({ name, email, image, password, confirmation })

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"image\" must be a valid uri",
      ]
    })
  });

  it('should respond with status 409 when creating an user with duplicated email', async () => {
    const user = await createUser();
    const name = user.login.name;
    const email = user.login.name;
    const password = user.user.password;
    const confirmation = password
    const result = await api.post('/users/signup').send({ name, email, password, confirmation });

    expect(result.status).toEqual(httpStatus.CONFLICT)
  });

  it('should respond with status 201 on creating a valid user', async () => {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const image = faker.image.imageUrl();
    const password = faker.internet.password();
    const confirmation = password
    const result = await api.post('/users/signup').send({ name, email, image, password, confirmation })

    expect(result.status).toEqual(httpStatus.CREATED)
  });
});

describe('POST /users/signin', () => {
  it('should respond with status 409 when no body is given', async () => {
    const result = await api.post('/users/signin');

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"email\" is required",
        "\"password\" is required"
      ]
    })
  });


  it('should respond with status 409 when no email is given', async () => {
    const user = await createUser();

    const result = await api.post('/users/signin').send({password: user.login.password})

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"email\" is required",
      ]
    })
  });

  it('should respond with status 409 when no password is given', async () => {
    const user = await createUser();
    const result = await api.post('/users/signin').send({email: user.login.email})

    expect(result.status).toEqual(httpStatus.CONFLICT)
    expect(result.body).toEqual({
      "message": [
        "\"password\" is required"
      ]
    })
  });

  it('should respond with status 401 if user is not registered', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const result = await api.post('/users/signin').send({ email, password });

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if password is wrong', async () => {
    const user = await createUser();
    const email = user.login.email;
    const password = faker.internet.password();

    const result = await api.post('/users/signin').send({ email, password });

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200 and user token when successfuly logged in', async () => {
    const user = await createUser();
    const body = {
      email: user.login.email,
      password: user.user.password,
    }

    const result = await api.post('/users/signin').send(body);

    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual(
      {
        token: expect.any(String),
        User: {
          name: user.user.name,
          image: user.user.image
        }
      }
    )

  });

});

describe('DELETE /users/delete/:id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const id = faker.random.numeric()
    const result = await api.delete(`/users/delete/${id}`);
    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const id = faker.random.numeric();
    const token = faker.lorem.word();
    const result = await api.delete(`/users/delete/${id}`).set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.login.id }, process.env.SECRET_KEY);

    const result = await api.delete(`/users/delete/${userWithoutSession.login.id}`).set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.UNAUTHORIZED)
  });

  describe('when token is valid', () => {
    it('should respond with status 204 when an user is deleted', async () => {
      const user = await createUser();
      const token = jwt.sign({ userId: user.login.id }, process.env.SECRET_KEY);
      await loginUser(token, user.login.id)

      const result = await api.delete(`/users/delete/${user.login.id}`).set('Authorization', `Bearer ${token}`);

      expect(result.status).toEqual(httpStatus.NO_CONTENT);
    });

    it('should respond with 401 when the user tries to delete someone else', async () => {
      const user1 = await createUser();
      const token = jwt.sign({ userId: user1.login.id }, process.env.SECRET_KEY);
      await loginUser(token, user1.login.id);

      const user2 = await createUser();

      const result = await api.delete(`/users/delete/${user2.login.id}`).set('Authorization', `Bearer ${token}`);

      expect(result.status).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
});