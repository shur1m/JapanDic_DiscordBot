const dictionaries = require('../../dictionaryFiles/dictionaries');

module.exports = async (interaction) => {
    interaction.reply('hello!');

    let definitions = [];
    let words = dictionaries[interaction.options.data[0].value]
    let searchTerm = interaction.options.data[1].value;

    if (words !== undefined){
        for (word of words){
            if (word[0] == searchTerm || word[1] == searchTerm){
                definitions.push(word)
            }
        }
    }

    console.log(definitions);
}