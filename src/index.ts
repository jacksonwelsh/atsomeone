import "dotenv/config";
import { Client, Intents } from "discord.js";
import { env } from "./env";
import { ClientT } from "./client";
import register from "./register";
import pickMember from "./util/pickMember";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
}) as ClientT;

register(client);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands?.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command.",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.id === client.user?.id) return;

  if (message.mentions.has(client.user?.id || "fakeuser")) {
    const member = await pickMember(message);
    message.reply({
      content: `<@${member?.id}>`,
      allowedMentions: {
        users: [member?.id || ""],
      },
    });
  }
});

client.login(env.TOKEN);
