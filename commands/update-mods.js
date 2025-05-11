const { SlashCommandBuilder } = require('discord.js');
const { writeMods } = require('../utils/mods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-mods')
    .setDescription('Обновить список модов')
    .addStringOption(option =>
      option.setName('mods')
        .setDescription('Новые моды, разделённые пробелами')
        .setRequired(true)),
  async execute(interaction) {
    const mods = interaction.options.getString('mods').trim().split(/\s+/);
    writeMods(mods);
    await interaction.reply({ content: 'Список модов обновлён.', ephemeral: true });
  }
};
