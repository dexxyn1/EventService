import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Log queries and other details
});

export default prisma;