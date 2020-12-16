import { Message } from 'discord.js';
import { create_drop } from '../database/db';
import { Command } from '../types';
import config from '../config.json';

const command: Command = {
  name: 'create_drop',
  description: 'Adds a tier to a certain gacha given a weight.',
  aliases: ['cd'],
  usage: '[cd tier weight gacha]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [tier weight gacha]
    if (message.author.id in config.owner) {
      message.reply("You don't have permission!")
    }
    if (args.length !== 3) {
      message.reply('Wrong number of arguments. Should be 3 for [cd tier weight gacha]');
      return;
    }
    const tier = parseInt(args[0]);
    const weight = parseInt(args[1]);
    create_drop(tier, weight, args[2]);
  }
};

module.exports = command;
