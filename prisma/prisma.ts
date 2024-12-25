import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ 
})

// This is critical in serverless environments to ensure a single instance
if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma = prisma
}
