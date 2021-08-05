module.exports = async (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
    
        switch (interaction.customId) {
            case 'primary':
                await interaction.reply('hello');
                break;
        }

    })

    console.log('buttons registered');
}