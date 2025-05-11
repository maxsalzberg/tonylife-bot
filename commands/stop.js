const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Остановить сервер'),

  async execute(interaction) {
    // Увеличиваем время ожидания Discord
    await interaction.deferReply({ ephemeral: true });

    // Сначала проверим статус контейнера
    exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при проверке статуса контейнера: ${error.message}`);
        return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
      }

      if (!stdout) {
        return interaction.editReply({ content: 'Контейнер уже остановлен.' });
      }

      // Выполним остановку сервера
      exec('docker compose -f /home/squadserver/docker-compose.yml down', (error, stdout, stderr) => {
        if (error) {
          console.error(`Ошибка при остановке сервера: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return interaction.editReply({ content: 'Произошла ошибка при остановке сервера.' });
        }

        // Проверяем, что контейнер остановился
        exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
          if (error) {
            console.error(`Ошибка при проверке статуса после остановки: ${error.message}`);
            return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
          }

          if (!stdout) {
            // Контейнер успешно остановлен
            interaction.editReply({ content: 'Сервер успешно остановлен.' });
          } else {
            // Контейнер всё ещё работает
            interaction.editReply({ content: 'Не удалось остановить сервер. Попробуйте еще раз.' });
          }
        });
      });
    });
  }
};
