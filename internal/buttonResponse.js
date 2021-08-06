const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const dictionaryFlip = require('./buttonResponses/dictionaryFlip');

module.exports = async (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
    
        switch (interaction.customId) {
            case 'primary':
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Some other title')
                    .setURL('https://discord.js.org')
                    .setDescription('Some description here');
                await interaction.update({ content: 'A button was clicked!', embeds: [embed], components: [] });
                break;
            
            //showing next page of entry
            case 'dictionaryNext':
                dictionaryFlip(client, interaction, true)
                break;
            case 'dictionaryBack':
                dictionaryFlip(client, interaction, false)
                break;
        }

    })

    console.log('buttons registered');
}