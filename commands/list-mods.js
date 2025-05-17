const { SlashCommandBuilder } = require('discord.js');
const { readMods } = require('../utils/mods');
const { sendCommandNotification } = require('../utils/notifications');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-mods')
    .setDescription('Show the list of mods'),

  async execute(interaction) {
    const mods = readMods();
    const modsList = mods.join('\n') || 'Empty';
    const userName = interaction.user.username;

    await interaction.reply({ content: `Current mods:\n\`\`\`\n${modsList}\n\`\`\``, ephemeral: true });

  }
};
