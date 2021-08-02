//sends message to console 
const dictionaries = require('../../dictionaryFiles/dictionaries.js')

module.exports = {
    commands: ['console', 'cs'],
    expectedArgs: '<message>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        console.log(dictionaries.daijisen[5]);
    },
    permissions: [],
    requiredRoles: [],
}