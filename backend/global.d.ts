declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        PORT: string;
        SECRET_KEY: string;
        MODE: string;
        GAME_URL: string;
        GAME_KEY: string;
    }
}