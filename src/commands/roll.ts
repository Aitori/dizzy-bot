import { Message } from 'discord.js';
import { drop_model, item_model } from '../database';
import { get_drops_gacha, get_item } from '../database/db';
import WeightedPick from '../services/weighted_pick';

module.exports = {
  name: 'roll',
  description: 'Rolls for an item!',
  aliases: ['r'],
  usage: '[roll gacha]',
  roles: '[Admin]',
  async execute(message: Message, args: string[]) {
    // args: [gacha]
    const drops = await get_drops_gacha(args[0])
    const pick = WeightedPick(drops);
    const item = await get_item(pick);
    const embed = {
      title: item.name,
      color: 937505,
      image: {
        url: item.imageUrl
      },
      author: {
        name: 'author name',
        iconURL: message.author.avatarURL()
      }
    };

    message.channel.send({ embed: embed });
  }
};
