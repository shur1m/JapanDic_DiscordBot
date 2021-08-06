const path = require('path');
const { readdirSync } = require('fs');

//registering dictionary options
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

let dictionaryNames = getDirectories(path.resolve(__dirname, '../', 'dictionaryFiles'))
let dictionaryOptions = [];

for (dictionaryName of dictionaryNames){
    dictionaryOptions.push({
        name: dictionaryName,
        value: dictionaryName,
    })
}

module.exports = async (client) => {

    const data = [
        
        //dictionary search command
        {
            name: 'search',
	        description: 'Looks up a specified dictionary for a Japanese word',
            options: [
                {
                    name: 'dictionary',
                    type: 'STRING',
                    description: 'selected dictionary',
                    required: true,
                    choices: dictionaryOptions,
                },

                {
                    name: 'word',
                    type: 'STRING',
                    description: 'word you would like to look up',
                    required: true,
                },
            ],
        },
        
        //ping 
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },

        {
            name: 'searchall',
            description: 'Searches all dictionaries for word',
            options: [{
                name: 'word',
                type: 'STRING',
                description: 'word you would like to look up',
                required: true,
            }]
        },
    ];

    const commands = await client.guilds.cache.get('826131784864759860')?.commands.set(data);
	//console.log(commands);
}