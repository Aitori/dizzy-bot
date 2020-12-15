"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
module.exports = {
    name: 'create_item',
    description: 'Creates an item.',
    aliases: ['ci'],
    usage: '[ci item_id item_name imageUrl cost]',
    roles: '[Admin]',
    execute: function (message, args) {
        // args: [item_id item_name imageUrl cost]
        if (args.length !== 4) {
            message.reply('Wrong number of arguments. Should be 4 for [ci item_id item_name imageUrl cost]');
            return;
        }
        var cost = parseFloat(args[3]);
        var new_item = new database_1.itemModel({
            item_id: args[0],
            name: args[1],
            description: "Default Description",
            imageUrl: args[2],
            cost: cost
        });
        new_item.save(function (error) {
            if (error)
                return console.error(error);
        });
    }
};
