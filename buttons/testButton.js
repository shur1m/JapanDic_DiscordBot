module.exports = {

    buttonID: 'testButton',
    type: 'button',
    permissionError: 'You do not have permission to run this command.',
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
    callback: (button, client) => {
        button.channel.send("helloworld");
    },
}