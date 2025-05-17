const { SlashCommandBuilder } = require('discord.js');
const { writeMods } = require('../utils/mods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear-mods')
    .setDescription('Clear the list of mods'),
  
  async execute(interaction) {
    writeMods([]);
    await interaction.reply({ content: 'Mod list has been cleared.', ephemeral: true });
  }
};
