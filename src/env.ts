import 'dotenv/config';
import { str, envsafe } from "envsafe";

export const env = envsafe({
  TOKEN: str(),
  CLIENT_ID: str(),
  GUILD_ID: str(),
});
