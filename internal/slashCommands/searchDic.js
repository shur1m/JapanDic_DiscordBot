const dictionaries = require('../../dictionaryFiles/dictionaries');
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const settings = require('../settings.json');
const wanakana = require('wanakana');

const path = require ('path');
const { readdirSync } = require('fs');

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

module.exports = async (interaction, searchAll) => {
    await interaction.defer();

    let definitions = [];
    let parsedDefinitions = [''];
    let dictionaryName = interaction.options.data[0].value;
    let searchTerm;
    let words = [];

    if (searchAll == false){
        searchTerm = interaction.options.data[1].value;
        words = dictionaries[interaction.options.data[0].value]
        
    } else {
        dictionaryName = 'All available dictionaries'
        searchTerm = interaction.options.data[0].value;

        const dictionaryNames = getDirectories(path.resolve(__dirname, '../../','dictionaryFiles'))
        for (element of dictionaryNames) {
            words = [...words, ...dictionaries[element]];
        }
    }

    if (wanakana.isRomaji(searchTerm)){
        searchTerm = wanakana.toKana(searchTerm);
    }

    //searching for word
    if (words !== undefined){
        for (word of words){
            if (word[0] == searchTerm || word[1] == searchTerm){
                definitions.push(word)
            }
        }
    }

    //add begins with in above loop

    if (definitions.length == 0){
        await interaction.editReply({content: '*Error: This term could not be found in the dictionary. Please check if you made any typos.*', ephemeral: true});
        
        interaction.fetchReply()
            .then(reply => {
                setTimeout(() => {
                    reply.delete()
                }, 2000)
            })
            .catch(console.error);
        return;
    }

    //creating definition string

    let entryNames = [[definitions[0][0], definitions[0][1]]];
    let i = 0;
    let numbers = 1;

    for(definition of definitions){
        console.log(definition[5]);

        if (definition[0] == entryNames[i][0] && definition[1] == entryNames[i][1]){
            if (dictionaryName == 'jmdict')
                parsedDefinitions[i] = parsedDefinitions[i] + `**${numbers++}.** `

            parsedDefinitions[i] = parsedDefinitions[i] + definition[5].join(', ') + '\n';
            
        } else {
            numbers = 1;
            i += 1;

            parsedDefinitions[i] = definition[5].join(', ') + '\n'

            if (dictionaryName == 'jmdict')
                parsedDefinitions[i] =`**${numbers++}.** ` + parsedDefinitions[i]

            entryNames[i] = [definition[0], definition[1]]
        }
    }

    //creating embed
    const embed = new MessageEmbed()
        .setColor(settings.embedColor)
        .setTitle(`${definitions[0][0]} (${definitions[0][1]})`)
        .setDescription(parsedDefinitions[0]) //first definition
        .setFooter(`Dictionary: ${dictionaryName}. Page 1 of ${entryNames.length}`);
    
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
        dictionary: dictionaryName,
    }

    console.log(message.japanDic);
}