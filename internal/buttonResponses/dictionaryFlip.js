const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const settings = require('../settings.json');

module.exports = async (client, interaction, flipRight) => {

    //await interaction.deferUpdate();

    if (interaction.message.japanDic === undefined){
        interaction.reply({content: 'This message has timed out. Please use the search command again', ephemeral: true});
        return;
    }

    if (flipRight)
        interaction.message.japanDic.index++;
    else
        interaction.message.japanDic.index--;

    const {definitions, entry, dictionary, index} = interaction.message.japanDic;

    const embed = new MessageEmbed()
        .setColor(settings.embedColor)
        .setTitle(`${entry[index][0]} (${entry[index][1]})`)
        .setDescription(definitions[index])
        .setFooter(`Dictionary: ${dictionary}. Page ${index+1} of ${definitions.length}`);

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton()
                .setCustomId('dictionaryBack')
                .setLabel('Back')
                .setStyle('PRIMARY')
                .setDisabled(index == 0),
            new MessageButton()
                .setCustomId('dictionaryNext')
                .setLabel('Next')
                .setStyle('PRIMARY')
                .setDisabled(index > definitions.length - 2),
        ]);

    await interaction.update({ embeds: [embed], components: [row] });
}