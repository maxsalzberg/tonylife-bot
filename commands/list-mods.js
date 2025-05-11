const { SlashCommandBuilder } = require('discord.js');
const { readMods } = require('../utils/mods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-mods')
    .setDescription('Показать список модов'),
  async execute(interaction) {
    const mods = readMods();
    await interaction.reply({ content: `Текущие моды:\n\`\`\`\n${mods.join('\n') || 'Пусто'}\n\`\`\``, ephemeral: true });
  }
};
