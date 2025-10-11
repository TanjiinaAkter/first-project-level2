import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });
// -------------- pre and save middleware use (7) .env theke bycript anbo--------------//

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycript_salt_rounds: process.env.BYCRIPT_SALT_ROUNDS,
};
