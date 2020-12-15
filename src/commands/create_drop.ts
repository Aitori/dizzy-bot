import { Message } from 'discord.js';
import { drop_model } from '../database';
import { create_drop } from '../database/db';
import { Command } from '../types';

const command: Command = {
  name: 'create_drop',
  description: 'Adds item to drop',
  aliases: ['cd'],
  usage: '[cd item_id weight gacha]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [item_id weight gacha]
    if (args.length !== 2) {
      message.reply('Wrong number of arguments. Should be 2 for [cd item_id weight]');
      return;
    }
    const item_id = parseInt(args[0]);
    const weight = parseInt(args[1]);
    create_drop(item_id, weight, args[2]);
  }
};

export { command };
