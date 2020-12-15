"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require discord for obvious reasons
var discord_js_1 = require("discord.js");
// require configuration
var config_json_1 = __importDefault(require("./config.json"));
// service imports
var check_command_1 = __importDefault(require("./services/check_command"));
var check_cooldown_1 = __importDefault(require("./services/check_cooldown"));
// collection imports
var commands_1 = __importDefault(require("./collections/commands"));
var mongoose_1 = __importDefault(require("mongoose"));
var db_1 = require("./database/db");
// initialize important things
var client = new discord_js_1.Client();
// client listener for ready
client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Aitori Dizzy Bot Ready');
        mongoose_1.default
            .connect(config_json_1.default.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(function () {
            console.log('Connected to mongo!');
        })
            .catch(function (error) {
            console.log('Error connecting to mongo: ' + error);
        });
        return [2 /*return*/];
    });
}); });
// on message listener
client.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var args, commandName, command, commandValid, timeLeft;
    return __generator(this, function (_a) {
        // if the message was by bot or isn't a command, exit
        if (message.author.bot)
            return [2 /*return*/];
        if (!message.content.startsWith(config_json_1.default.prefix))
            return [2 /*return*/];
        args = message.content.slice(config_json_1.default.prefix.length).trim().split(/ +/);
        commandName = args.shift().toLowerCase();
        command = commands_1.default.get(commandName) ||
            commands_1.default.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName); });
        commandValid = check_command_1.default(command, message, args, config_json_1.default.prefix);
        if (commandValid != null) {
            message.reply(commandValid);
            return [2 /*return*/];
        }
        timeLeft = check_cooldown_1.default(command, message);
        if (timeLeft != null) {
            message.reply("Please wait " + timeLeft.toFixed(1) + " before trying the `" + command.name + "` command.");
        }
        // ugh
        db_1.updateUserPoints(message.author.id);
        // execute command!
        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('Oops, something went wrong! Check error logs.');
        }
        return [2 /*return*/];
    });
}); });
client.login(config_json_1.default.token);
