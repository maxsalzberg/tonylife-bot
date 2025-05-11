const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Остановить сервер'),

  async execute(interaction) {
    // Увеличиваем время ожидания Discord
    await interaction.deferReply({ ephemeral: true });

    exec('docker compose -f /home/squadserver/docker-compose.yml down', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при остановке сервера: ${error.message}`);
        return interaction.editReply({ content: 'Произошла ошибка при остановке сервера.' });
      }

      interaction.editReply({ content: 'Сервер успешно остановлен.' });
    });
  }
};
