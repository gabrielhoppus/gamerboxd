import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
prisma = new PrismaClient();

export function connectDb(): void {
    prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
    await prisma?.$disconnect();
}

export default prisma;