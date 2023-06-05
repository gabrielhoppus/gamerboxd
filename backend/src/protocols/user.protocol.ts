export type UserEntity = {
    id: number,
    name: string,
    email: string,
    password: string,
    token: string,
}

export type CheckEmail = {
    email: string,
    password: string,
    id: number,
    token: string,
}

export type NewLogin = {
    email: string,
    password: string
}

export type checkId = {
    id: string,
}


export type NewUser = Omit<UserEntity, "id" | "token">

