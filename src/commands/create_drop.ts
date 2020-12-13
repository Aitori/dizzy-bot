import { Message } from 'discord.js';
import { dropModel } from '../database';
import { Command } from '../types';

const command: Command = {
  name: 'create_drop',
  description: 'Adds item to drop',
  aliases: ['cd'],
  usage: '[cd item_id weight]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [item_id item_name imageUrl cost]
    if (args.length !== 2) {
      message.reply('Wrong number of arguments. Should be 2 for [cd item_id weight]');
      return;
    }
    const weight = parseFloat(args[1]);
    const new_drop = new dropModel({
      item_id: args[0],
      weight: weight
    });
    new_drop.save((error) => {
      if (error) return console.error(error);
    });
  }
};

export { command };
