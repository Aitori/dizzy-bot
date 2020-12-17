import { Message } from 'discord.js';
import { get_all_gachas } from '../database/db';
import { Command, Gacha } from '../types';

const command: Command = {
  name: 'list_gacha',
  description: 'Lists the available gachas and their costs!',
  aliases: ['lg'],
  usage: '[list_gacha]',
  guildOnly: true,
  async execute(message: Message) {
    const data = await get_all_gachas();
    const dataPush = data.map((gacha: Gacha) => {
      return gacha.gacha + ': ' + gacha.cost + ' things';
    });
    message.channel.send(dataPush, { split: true });
  }
};

module.exports = command;
