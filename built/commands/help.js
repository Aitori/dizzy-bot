"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("../config.json"));
var commands_1 = __importDefault(require("../collections/commands"));
module.exports = {
    name: 'help',
    description: 'List all commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[commandName]',
    cooldown: 10,
    execute: function (message, args) {
        var data = [];
        if (!args.length) {
            data.push('Dizzy Commands:');
            data.push(commands_1.default.map(function (command) { return command.name; }).join(' | '));
            data.push("\nUse `" + config_json_1.default.prefix + "help [command]` for more info!");
            return message.author.send(data, { split: true })
                .then(function () {
                if (message.channel.type === 'dm')
                    return;
                // message.reply('I\'ve sent you a DM with all my commands!');
            })
                .catch(function (error) {
                console.error("Could not send help DM to " + message.author.tag + ".\n", error);
                // message.reply('Can't DM you :(');
            });
        }
        var name = args[0].toLowerCase();
        var command = commands_1.default.get(name) || commands_1.default.find(function (c) { return c.aliases && c.aliases.includes(name); });
        if (!command) {
            return message.reply('Dizzy Command not found :(');
        }
        data.push("**Command:** " + command.name);
        if (command.aliases)
            data.push("**Aliases:** " + command.aliases.join(', '));
        if (command.description)
            data.push("**Description:** " + command.description);
        if (command.usage)
            data.push("**Usage:** " + config_json_1.default.prefix + command.name + " " + command.usage);
        data.push("**Cooldown:** " + (command.cooldown || 3) + " second(s)");
        message.channel.send(data, { split: true });
    },
};
