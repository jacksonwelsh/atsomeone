import { ClientT } from './client';
import { Collection } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

export default (client: ClientT) => {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;

    client.commands.set(command.data.name, command);
  }
}
