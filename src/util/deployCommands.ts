import * as fs from "fs";
import * as path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { env } from "../env";

const rest = new REST({ version: "10" }).setToken(env.TOKEN);

const commands = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath).default;
  commands.push(command.data.toJSON());
}

rest
  .put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
