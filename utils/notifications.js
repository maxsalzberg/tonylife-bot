// utils/notifications.js
const { Client } = require('discord.js');

/**
 * Отправка уведомлений владельцу бота о выполнении команды.
 * @param {Client} client - Экземпляр клиента Discord.
 * @param {string} userTag - Тег пользователя, который использовал команду.
 * @param {string} commandName - Имя использованной команды.
 * @param {string} result - Результат выполнения команды.
 */
async function sendCommandNotification(client, userTag, commandName, result) {
  try {
    const { ownerId } = require('../config.json');
    const user = await client.users.fetch(ownerId);

    const message = `**${userTag}** использовал команду \`/${commandName}\`\nРезультат:\n\`\`\`\n${result}\n\`\`\``;
    
    await user.send(message);
  } catch (error) {
    console.error('Ошибка при отправке уведомления о команде:', error);
  }
}

module.exports = { sendCommandNotification };
