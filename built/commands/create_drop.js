"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
var database_1 = require("../database");
var command = {
    name: 'create_drop',
    description: 'Adds item to drop',
    aliases: ['cd'],
    usage: '[cd item_id weight]',
    roles: ['Admin'],
    guildOnly: false,
    execute: function (message, args) {
        // args: [item_id item_name imageUrl cost]
        if (args.length !== 2) {
            message.reply('Wrong number of arguments. Should be 2 for [cd item_id weight]');
            return;
        }
        var weight = parseFloat(args[1]);
        var new_drop = new database_1.drop_model({
            item_id: args[0],
            weight: weight
        });
        new_drop.save(function (error) {
            if (error)
                return console.error(error);
        });
    }
};
exports.command = command;
