import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "../../../config";

if (!config.DATABASE_URL) throw new Error("Data base url cannot be found");

const client = postgres(config.DATABASE_URL || "", { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("🟠 Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟡 Successfully Migrated");
  } catch (error) {
    console.log("🔴 Error Migrating client", error);
  }
};
migrateDb();
export default db;
