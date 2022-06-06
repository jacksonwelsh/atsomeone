import { Message } from "discord.js";

const getMember = async (message: Message) => {
  return await message.guild?.channels
    .fetch(message.channelId)
    .then((c) => c?.members)
    .then((m) => m?.random());
};

export default getMember;
