const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Перезапустить сервер'),

  async execute(interaction) {
    // Увеличиваем время ожидания Discord
    await interaction.deferReply({ flags: 64 }); // Используем flags вместо ephemeral

    // Проверяем, работает ли уже контейнер
    exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка при проверке статуса контейнера: ${error.message}`);
        return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
      }

      if (!stdout) {
        // Контейнер не работает, сообщаем об этом
        return interaction.editReply({ content: 'Сервер не запущен.' });
      }

      // Останавливаем контейнер
      exec('docker compose -f /home/squadserver/docker-compose.yml down', (error, stdout, stderr) => {
        if (error) {
          console.error(`Ошибка при остановке сервера: ${error.message}`);
          return interaction.editReply({ content: 'Произошла ошибка при остановке сервера.' });
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
              console.error(`Ошибка при проверке статуса после перезапуска: ${error.message}`);
              return interaction.editReply({ content: 'Не удалось проверить статус контейнера.' });
            }

            if (stdout) {
              // Контейнер успешно перезапущен
              interaction.editReply({ content: 'Сервер успешно перезапущен.' });
            } else {
              // Контейнер всё ещё не запустился
              interaction.editReply({ content: 'Не удалось перезапустить сервер. Попробуйте еще раз.' });
            }
          });
        });
      });
    });
  }
};
