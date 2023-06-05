import dotenv from "dotenv";

export function loadEnv() {
    const path =
        process.env.NODE_ENV === 'test'
            ? '.env.test'
            : '.env';
    dotenv.config({ path });
}