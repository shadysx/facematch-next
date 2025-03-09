import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { apiKey } from "better-auth/plugins";

export const auth = betterAuth({
  database: new Database("./prisma/data/sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [apiKey()],
});
