module.exports = (client, obj, permissions) => {
    let botPerms = obj.channel.permissionsFor(client.user).toArray();
    let hasPermission = true; //'SEND_MESSAGES'
    let missingPerms = [];
    
    for (permission of permissions){
        if (!botPerms.includes(permission)){
            missingPerms.push(permission);
        }
    }

    return missingPerms.length != 0;
}