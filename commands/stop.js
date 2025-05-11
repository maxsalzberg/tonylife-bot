const { SlashCommandBuilder } = require('discord.js');
const { runCommand } = require('../utils/docker');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Остановить Docker Compose'),
  async execute(interaction) {
    try {
      const output = await runCommand('docker compose down');
      await interaction.reply({ content: `Сервер остановлен:\n\`\`\`\n${output}\n\`\`\``, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: `Ошибка:\n\`\`\`\n${e}\n\`\`\``, ephemeral: true });
    }
  }
};
