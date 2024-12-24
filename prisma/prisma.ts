import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
    log: ['query', 'info', 'warn', 'error'],
})

// This is critical in serverless environments to ensure a single instance
if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma = prisma
}
