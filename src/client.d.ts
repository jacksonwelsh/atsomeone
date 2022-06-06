import { Client, Collection } from "discord.js";

type ClientT = Client & { commands?: Collection };
