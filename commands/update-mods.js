const { SlashCommandBuilder } = require('discord.js');
const { writeMods } = require('../utils/mods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-mods')
    .setDescription('Update the list of mods')
    .addStringOption(option =>
      option.setName('mods')
        .setDescription('New mods, separated by spaces')
        .setRequired(true)),
  
  async execute(interaction) {
    const mods = interaction.options.getString('mods').trim().split(/\s+/);
    writeMods(mods);
    await interaction.reply({ content: 'Mod list has been updated.', ephemeral: true });
  }
};
