require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials, Events } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  const { allowedRoleId } = require('./config.json');
  const member = interaction.member;

  if (
    interaction.guild &&
    !member.roles.cache.has(allowedRoleId)
  ) {
    return interaction.reply({ content: 'You do not have access to this command.', ephemeral: true });
  }

  try {
 
    await command.execute(interaction);

  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
  }
});

client.login(process.env.TOKEN);
