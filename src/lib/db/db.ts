import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error"],
  });

db.$connect().then(() => {
  console.log("Database connected by Prisma");
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
