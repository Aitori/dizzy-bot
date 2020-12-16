import { Message } from 'discord.js';
import { create_item } from '../database/db';
import { Command } from '../types';
import config from '../config.json';

const command: Command = {
  name: 'create_item',
  description: 'Creates an item given the specified description.',
  aliases: ['ci'],
  usage: '[ci item_id item_name imageUrl cost tier]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [item_id item_name imageUrl cost tier]
    if (message.author.id in config.owner) {
      message.reply("You don't have permission!")
    }
    if (args.length !== 5) {
      message.reply(
        'Wrong number of arguments. Should be 4 for [ci item_id item_name imageUrl cost tier]'
      );
      return;
    }
    const item_id = parseInt(args[0]);
    const cost = parseInt(args[3]);
    const tier = parseInt(args[4])
    create_item(item_id, args[1], args[2], cost, tier);
  }
};

module.exports = command;
