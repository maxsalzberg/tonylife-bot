const { SlashCommandBuilder } = require('discord.js');
const { runCommand } = require('../utils/docker');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Запустить Docker Compose'),
  async execute(interaction) {
    try {
      const output = await runCommand('docker compose up -d');
      await interaction.reply({ content: `Сервер запущен:\n\`\`\`\n${output}\n\`\`\``, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: `Ошибка:\n\`\`\`\n${e}\n\`\`\``, ephemeral: true });
    }
  }
};
