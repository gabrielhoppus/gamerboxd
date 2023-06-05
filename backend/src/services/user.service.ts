import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "@/errors/index";
import userRepository from "@/repositories/user.repository";
import { NewUser, NewLogin } from "@/protocols/user.protocol";


async function createUser({ name, email, password }: NewUser) {
    const checkEmail = await userRepository.findByEmail(email);
    if (checkEmail) throw errors.duplicatedEmailError();
    

    const hashPassword: string = await bcrypt.hash(password, 10)
    await userRepository.createUser({ name, email, password: hashPassword })
}

async function findUsers() {
    const users = await userRepository.findUsers();
    if (users.length === 0) return [];
    return users;
}

async function loginUser({ email, password }: NewLogin) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    if (!user.token) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        await userRepository.loginUser(token, user.id);
        return token;
    }
}

async function deleteUser(id: string){
    const userId = parseInt(id)
    const user = await userRepository.findById(userId);
    if (!user) throw errors.notFoundError();

    await userRepository.deleteUser(userId);
}

export default {
    createUser,
    findUsers,
    loginUser,
    deleteUser
}