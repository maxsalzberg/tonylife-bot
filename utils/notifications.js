// const { Client } = require('discord.js');

// /**
//  * Send a notification to the bot owner about a command execution.
//  * @param {Client} client - Discord client instance.
//  * @param {string} userTag - The tag of the user who executed the command.
//  * @param {string} commandName - The name of the executed command.
//  * @param {string} result - The result of the command execution.
//  */
// async function sendCommandNotification(client, userTag, commandName, result) {
//   try {
//     const { ownerId } = require('../config.json');
//     const user = await client.users.fetch(ownerId);

//     const message = `**${userTag}** used the command \`/${commandName}\`\nResult:\n\`\`\`\n${result}\n\`\`\``;
    
//     await user.send(message);
//   } catch (error) {
//     console.error('Error sending command notification:', error);
//   }
// }

// module.exports = { sendCommandNotification };
