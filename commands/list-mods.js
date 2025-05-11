// commands/list-mods.js
const { SlashCommandBuilder } = require('discord.js');
const { readMods } = require('../utils/mods');
const { sendCommandNotification } = require('../utils/notifications');  // Импортируем функцию уведомлений

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-mods')
    .setDescription('Показать список модов'),

  async execute(interaction) {
    const mods = readMods();  // Получаем текущие моды
    const modsList = mods.join('\n') || 'Пусто';  // Если нет модов, выводим 'Пусто'
    const userName = interaction.user.username;  // Имя пользователя, который вызвал команду

    // Отправляем список модов в канал (ephemeral - скрытый ответ для пользователя)
    await interaction.reply({ content: `Текущие моды:\n\`\`\`\n${modsList}\n\`\`\``, ephemeral: true });

    // Отправляем отчёт в ЛС с информацией о пользователе и списке модов
    // await sendCommandNotification(interaction.client, interaction.user.tag, 'list-mods', modsList);
  }
};
