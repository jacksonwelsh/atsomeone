import { Message } from "discord.js";
import { ClientT } from "src/client";

const getMember = (message: Message) => {
  return message.guild?.members.fetch().then((members) => members.random());
};

export default getMember;
