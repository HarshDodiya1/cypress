import { defineConfig } from "drizzle-kit";
import { config } from "./config";

if (!config.DATABASE_URL) {
  console.log("🔴 Cannot find database password");
}
export default defineConfig({
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL!,
  },  
});
