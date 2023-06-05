import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import 'dotenv/config'
import { connectDb, disconnectDB } from '@/config/database.connection';
import { handleApplicationErrors } from "@/middlewares/error.middleware";

import router from "./routes/app.routes";

const app = express();
app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send('OK!'))
    .use(router)
    .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;
