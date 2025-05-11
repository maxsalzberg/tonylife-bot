const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Запустить сервер'),

  async execute(interaction) {
    // Увеличиваем время ожидания Discord
    await interaction.deferReply({ flags: 64 }); // Используем flags вместо ephemeral

    // Проверяем, работает ли уже контейнер
    exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при проверке статуса контейнера: ${error.message}`);
        return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
      }

      if (stdout) {
        // Контейнер уже работает
        return interaction.editReply({ content: 'Сервер уже запущен.' });
      }

      // Запускаем сервер
      exec('docker compose -f /home/squadserver/docker-compose.yml up -d', (error, stdout, stderr) => {
        if (error) {
          console.error(`Ошибка при запуске сервера: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return interaction.editReply({ content: 'Произошла ошибка при запуске сервера.' });
        }

        // Проверяем, что контейнер запустился
        exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
          if (error) {
            console.error(`Ошибка при проверке статуса после запуска: ${error.message}`);
            return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
          }

          if (stdout) {
            // Контейнер успешно запущен
            interaction.editReply({ content: 'Сервер успешно запущен.' });
          } else {
            // Контейнер всё ещё не запущен
            interaction.editReply({ content: 'Не удалось запустить сервер. Попробуйте еще раз.' });
          }
        });
      });
    });
  }
};
