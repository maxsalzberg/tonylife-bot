const { SlashCommandBuilder } = require('discord.js');
const { runCommand } = require('../utils/docker');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Перезапустить Docker Compose'),
  async execute(interaction) {
    try {
      const output = await runCommand('docker compose down && docker compose up -d');
      await interaction.reply({ content: `Сервер перезапущен:\n\`\`\`\n${output}\n\`\`\``, ephemeral: true });
    } catch (e) {
      await interaction.reply({ content: `Ошибка:\n\`\`\`\n${e}\n\`\`\``, ephemeral: true });
    }
  }
};
