import { Message } from 'discord.js';
import { create_gacha } from '../database/db';
import { Command } from '../types';
import config from '../config.json';

const command: Command = {
  name: 'create_gacha',
  description: 'Creates a level of gacha',
  aliases: ['cg'],
  usage: '[cd cost gacha]',
  roles: ['Admin'],
  guildOnly: false,
  execute(message: Message, args: string[]) {
    // args: [tier weight gacha]
    if (message.author.id in config.owner) {
      message.reply("You don't have permission!")
    }
    if (args.length !== 2) {
      message.reply('Wrong number of arguments. Should be 2 for [cd cost gacha]');
      return;
    }
    const cost = parseInt(args[0]);
    create_gacha(cost, args[1]);
  }
};

module.exports = command;