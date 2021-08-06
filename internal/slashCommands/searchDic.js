const dictionaries = require('../../dictionaryFiles/dictionaries');
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const settings = require('../settings.json');

module.exports = async (interaction) => {
    await interaction.defer();

    let definitions = [];
    let parsedDefinitions = [''];
    let words = dictionaries[interaction.options.data[0].value]
    let searchTerm = interaction.options.data[1].value;
    
    //searching for word
    if (words !== undefined){
        for (word of words){
            if (word[0] == searchTerm || word[1] == searchTerm){
                definitions.push(word)
            }
        }
    }

    if (definitions.length == 0){
        await interaction.reply({content: '*Error: This term could not be found in the dictionary. Please check if you made any typos.*', ephemeral: true});
        return;
    }

    //creating definition string

    let entryNames = [[definitions[0][0], definitions[0][1]]];
    let i = 0;
    let numbers = 1;

    for(definition of definitions){

        if (definition[0] == entryNames[i][0] && definition[1] == entryNames[i][1]){
            parsedDefinitions[i] = parsedDefinitions[i] + `**${numbers++}.** ` + definition[5].join(', ') + '\n';
        } else {
            numbers = 1;
            i += 1;
            parsedDefinitions[i] =`**${numbers++}.** ` + definition[5].join(', ') + '\n'
            entryNames[i] = [definition[0], definition[1]]
        }
    }

    //creating embed
    const embed = new MessageEmbed()
        .setColor(settings.embedColor)
        .setTitle(`${definitions[0][0]} (${definitions[0][1]})`)
        .setDescription(parsedDefinitions[0]) //first definition
        .setFooter(`Dictionary: ${interaction.options.data[0].value}. Page 1 of ${entryNames.length}`);
    
    //creating buttons
    let nextDisabled = entryNames.length == 1

    const row = new MessageActionRow()
		.addComponents([
			new MessageButton()
                .setCustomId('dictionaryBack')
                .setLabel('Back')
                .setStyle('PRIMARY')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('dictionaryNext')
                .setLabel('Next')
                .setStyle('PRIMARY')
                .setDisabled(nextDisabled),
        ]);

    interaction.editReply({embeds: [embed], components: [row] });
    const message = await interaction.fetchReply();
    
    message.japanDic = {
        index: 0,
        definitions: parsedDefinitions,
        entry: entryNames,
        dictionary: interaction.options.data[0].value,
    }

    console.log(message.japanDic);
}