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
                    choices: [
                        {
                            name: 'daijisen',
                            value: 'daijisen',
                        },
                        {
                            name: 'jmdict',
                            value: 'jmdict',
                        },
                    ],
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
    ];

    const commands = await client.guilds.cache.get('826131784864759860')?.commands.set(data);
	//console.log(commands);
}