const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start the server'),

  async execute(interaction) {
    await interaction.deferReply({ flags: 64 });

    exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error checking container status: ${error.message}`);
        return interaction.editReply({ content: 'Failed to check container status.' });
      }

      if (stdout) {
        return interaction.editReply({ content: 'Server is already running.' });
      }

      exec('docker compose -f /home/squadserver/docker-compose.yml up -d', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting server: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return interaction.editReply({ content: 'Error occurred while starting the server.' });
        }

        exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error checking container status after start: ${error.message}`);
            return interaction.editReply({ content: 'Failed to verify container status.' });
          }

          if (stdout) {
            interaction.editReply({ content: 'Server started successfully.' });
          } else {
            interaction.editReply({ content: 'Failed to start the server. Please try again.' });
          }
        });
      });
    });
  }
};
