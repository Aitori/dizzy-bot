import { Message } from 'discord.js';
import { dropModel, itemModel } from '../database';
import WeightedPick from '../services/weighted_pick';
import { Item } from 'src/types';

module.exports = {
  name: 'roll',
  description: 'Rolls for an item!',
  aliases: ['r'],
  usage: '[roll]',
  roles: '[Admin]',
  async execute(message: Message) {
    let drops = [];
    const allDrops = dropModel.find({});
    await allDrops.then((items) => (drops = items));
    const modified = drops.map((d) => {
      return {
        item_id: d.item_id,
        weight: d.weight
      };
    });
    const pick = WeightedPick(modified);
    const item_query = itemModel.find({ item_id: pick });
    await item_query.then((items) => (drops = items));
    const embed = {
      title: drops[0].name,
      color: 937505,
      image: {
        url: drops[0].imageUrl
      },
      author: {
        name: 'author name',
        iconURL: message.author.avatarURL()
      }
    };

    message.channel.send({ embed: embed });
  }
};
