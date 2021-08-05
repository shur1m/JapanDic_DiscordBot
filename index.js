const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const { token } = require('./config.json');
const parse = require('./parse.js');
const dictionaries = require('./dictionaryFiles/dictionaries.js');
const regSlash = require('./internal/regSlash');
const slashResponse = require('./internal/slashResponse');
const buttonResponse = require('./internal/buttonResponse');

//initializing bot
client.on('ready', async () => {
    console.log('the client is ready');

    //parse and store dictionaries
    Object.assign(dictionaries, parse());

    //registering commands and buttons
    regSlash(client);
    slashResponse(client);
    buttonResponse(client);
});

client.login(token);