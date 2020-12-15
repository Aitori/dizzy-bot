import { Message } from 'discord.js';
import { create_item } from '../database/db';
import { Command } from '../types';

const command: Command = {
  name: 'create_item',
  description: 'Creates an item.',
  aliases: ['ci'],
  usage: '[ci item_id item_name imageUrl cost]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [item_id item_name imageUrl cost]
    if (args.length !== 4) {
      message.reply(
        'Wrong number of arguments. Should be 4 for [ci item_id item_name imageUrl cost]'
      );
      return;
    }
    const item_id = parseInt(args[0]);
    const cost = parseInt(args[3]);
    create_item(item_id, args[1], args[2], cost);
  }
};

export { command };
