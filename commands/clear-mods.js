const { SlashCommandBuilder } = require('discord.js');
const { writeMods } = require('../utils/mods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear-mods')
    .setDescription('Очистить список модов'),
  
  async execute(interaction) {
    // Передаем пустой массив, чтобы очистить список модов
    writeMods([]);
    
    await interaction.reply({ content: 'Список модов очищен.', ephemeral: true });
  }
};
