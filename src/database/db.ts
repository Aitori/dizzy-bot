import { drop_model, user_model } from '.';
import { Drop, Item, User } from '../types';
import { inventory_model } from './schema/inventory';
import { item_model } from './schema/item';

/* User Helper Functions
========================
*/
const getUserDatabase = async (uid: string) => {
  let user = await user_model.findOne({ id: uid });
  if (user) {
    return user;
  } else {
    user = new user_model({
      uid: uid
    });
    await user.save().catch((error) => console.log(error));
    return user;
  }
};

const user_add_points = async (uid: string, points: number): Promise<User> => {
  const user = await user_model.findOneAndUpdate(
    { uid: uid },
    { $inc: { points: points } },
    { upsert: true, useFindAndModify: false }
  );
  return user;
};
/* Item Helper Functions 
========================
*/
/* Create Item */
const create_item = async (
  item_id: number,
  name: string,
  imageUrl: string,
  cost: number,
  tier: number
) => {
  const new_item = new item_model({
    item_id: item_id,
    name: name,
    imageUrl: imageUrl,
    cost: cost,
    tier: tier
  });
  new_item.save((error) => {
    if (error) return console.error(error);
  });
};

/* Get Item */
const get_item = async (item_id: number): Promise<Item> => {
  const item = await item_model.find({ item_id: item_id });
  return item[0];
};

const get_items_tier = async (tier: number): Promise<Item[]> => {
  const items = await item_model.find({ tier: tier });
  return items;
};
/* Drop Helper Functions
========================
*/
/* Create Drop */
const create_drop = async (tier: number, weight: number, gacha: string) => {
  const new_drop = new drop_model({
    tier: tier,
    weight: weight,
    gacha: gacha
  });
  new_drop.save((error) => {
    if (error) return console.error(error);
  });
};

/* Get drop tiers based on gacha */
const get_tiers_gacha = async (gacha: string): Promise<Drop[]> => {
  const all_documents = await drop_model.find({ gacha: gacha });
  return all_documents;
};
/* Inventory Helper Functions
========================
*/
/* Add to inventory */
const add_to_inventory = async (uid: string, item_id: number, count: number) => {
  const inv = await inventory_model.findOneAndUpdate(
    { uid: uid, item_id: item_id },
    { $inc: { count: count } },
    { upsert: true, useFindAndModify: false }
  );
  return inv;
};

export {
  getUserDatabase,
  create_item,
  create_drop,
  get_tiers_gacha,
  get_item,
  get_items_tier,
  user_add_points,
  add_to_inventory
};
