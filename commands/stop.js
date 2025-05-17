const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the server'),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error checking container status: ${error.message}`);
        return interaction.editReply({ content: 'Failed to check container status.' });
      }

      if (!stdout) {
        return interaction.editReply({ content: 'Server is already stopped.' });
      }

      exec('docker compose -f /home/squadserver/docker-compose.yml down', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping server: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return interaction.editReply({ content: 'Error occurred while stopping the server.' });
        }

        exec('docker ps -q -f name=north-server', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error checking container status after stop: ${error.message}`);
            return interaction.editReply({ content: 'Failed to verify container status.' });
          }

          if (!stdout) {
            interaction.editReply({ content: 'Server stopped successfully.' });
          } else {
            interaction.editReply({ content: 'Failed to stop the server. Please try again.' });
          }
        });
      });
    });
  }
};
