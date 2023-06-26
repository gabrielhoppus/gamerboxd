import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "@/errors/index";
import userRepository from "@/repositories/user.repository";
import { NewUser, NewLogin, NewUserEntity } from "@/protocols/user.protocol";

async function createUser({ name, email, image, password, confirmation }: NewUser) {
    const checkEmail = await userRepository.findByEmail(email);
    if (checkEmail) throw errors.duplicatedEmailError();

    if (password !== confirmation) throw errors.invalidCredentialsError();

    const hashPassword: string = await bcrypt.hash(password, 10)

    const data: NewUserEntity = {
        name,
        email,
        image,
        password: hashPassword
    } 

    await userRepository.createUser(data)
}

async function findUsers() {
    const users = await userRepository.findUsers();
    if (users.length === 0) return [];
    return users;
}

async function findUserByEmail(email: string){
    const user = await userRepository.findByEmail(email);

    return user
}

async function loginUser({ email, password }: NewLogin) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();
    const userId = Number(user.id)
    const token = jwt.sign({ userId }, process.env.SECRET_KEY);

    const userInfo = await userRepository.loginUser(
        token,
        userId
    );

    return userInfo;
}

async function deleteUser(id: number, userId: number) {

    if (id !== userId) throw errors.unauthorizedError();

    const user = await userRepository.findById(id);
    console.log(user)
    if (!user) throw errors.notFoundError();

    await userRepository.deleteUser(userId);
}

export default {
    createUser,
    findUsers,
    loginUser,
    deleteUser,
    findUserByEmail
}