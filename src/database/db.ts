import { drop_model, user_model } from '.';
import { Drop, Item, User } from '../types';
import { gacha_model } from './schema/gacha';
import { inventory_model } from './schema/inventory';
import { item_model } from './schema/item';

/* User Helper Functions
========================
*/
const get_user = async (uid: string) => {
  let user = await user_model.findOne({ uid: uid });
  if (user) {
    return user;
  } else {
    user = new user_model({
      uid: uid,
      points: 0
    });
    await user.save().catch((error) => console.log(error));
    return user;
  }
};

const user_add_points = async (uid: string, points: number): Promise<User> => {
  const user = await user_model.findOneAndUpdate(
    { uid: uid },
    { $inc: { points: points } },
    { upsert: true, useFindAndModify: false, new: true }
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

const get_inventory = async (uid: string) => {
  const inv = await inventory_model.find({uid: uid});
  return inv;
}
/* Gacha Helper Functions
========================
*/
/* Create a gacha */
const create_gacha = async (cost: number, gacha: string) => {
  const new_gacha = new gacha_model({ cost: cost, gacha: gacha });
  new_gacha.save((error) => {
    if (error) return console.error(error);
  });
};

const check_gacha = async (gacha: string) => {
  const check = await gacha_model.findOne({gacha: gacha});
  if(check) return true;
  return false;
}
// returns a specific gacha object
const get_gacha = async (gacha: string) => {
  const check = await gacha_model.findOne({gacha: gacha});
  return check;
}
// get all gachas
const get_all_gachas = async () => {
  const all_gachas = await gacha_model.find({});
  return all_gachas;
}

export {
  get_user,
  create_item,
  create_drop,
  get_tiers_gacha,
  get_item,
  get_items_tier,
  user_add_points,
  add_to_inventory,
  create_gacha,
  check_gacha,
  get_gacha,
  get_all_gachas,
  get_inventory
};
