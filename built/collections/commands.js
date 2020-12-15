"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var fs = require("fs");
var path = require("path");
var commands = new discord_js_1.Collection();
var dirPath = path.resolve(__dirname, '../commands');
var commandFiles = fs.readdirSync(dirPath).filter(function (file) { return file.endsWith('.ts'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var command = require("../commands/" + file);
    commands.set(command.name, command);
}
exports.default = commands;
