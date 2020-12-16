import { Message, MessageReaction } from 'discord.js';
import { get_tiers_gacha, get_items_tier, add_to_inventory } from '../database/db';
import { send_item_embed } from '../services/send_item_embed';
import WeightedPick from '../services/weighted_pick';
import { Command } from '../types';

const command: Command = {
  name: 'roll',
  description: 'Rolls for an item!',
  aliases: ['r'],
  usage: '[roll gacha]',
  guildOnly: false,
  async execute(message: Message, args: string[]) {
    // args: [gacha]
    if (args.length !== 1) {
      message.reply('Wrong number of arguments. Should be 1 for [roll gacha]');
      return;
    }
    // Collects all drops given the certain gacha
    const drops = await get_tiers_gacha(args[0]);
    if (drops.length < 1) {
      message.reply('The gacha ' + args[0] + ' does not exist.');
      return;
    }
    // Randomly selects a tier
    const tier = WeightedPick(drops);
    // Gets all items of said tier
    const possible_items = await get_items_tier(tier);
    // Selects an item from the tier
    const item = possible_items[Math.floor(Math.random() * possible_items.length)];
    // Sends the message and reacts
    const sent_message = await send_item_embed(message, item);
    await sent_message.react('🥢').then(() => sent_message.react('🍴'));

    // filter construction for the filter and then reaction collector
    const filter = (reaction: MessageReaction) => {
      return reaction.emoji.name === '🥢' || reaction.emoji.name === '🍴';
    };
    const collector = sent_message.createReactionCollector(filter, { max: 1, time: 30000 });
    collector.on('collect', (reaction, user) => {
      if (reaction.emoji.name === '🥢') {
        const collected = add_to_inventory(user.id, item.item_id, 1);
        if (collected != null) {
          if (message.author.id != user.id) {
            message.channel.send('@' + user.tag + ' yeeted ' + item.name);
          } else {
            message.channel.send('@' + user.tag + ' has claimed ' + item.name);
          }
        }
      } else {
        message.channel.send('@' + user.tag + ' has destroyed ' + item.name);
      }
    });
  }
};

module.exports = command;
