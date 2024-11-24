import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["query", "error"],
});
export default db;
