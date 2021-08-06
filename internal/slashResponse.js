const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const searchDic = require('./slashCommands/searchDic');

module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
    
        switch (interaction.commandName) {

            case 'search':
                searchDic(interaction);
                break;

            case 'ping':
                ping(interaction);
                break;
            
            case 'searchall':
                searchDic(interaction, true)
                break;
        }

    })

    console.log('slash commands registered');
}

async function ping(interaction){
    const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
		);
    
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org')
        .setDescription('Some description here');

	await interaction.reply({ content: 'Pong!', embeds: [embed], components: [row] });
}