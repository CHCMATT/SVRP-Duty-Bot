const dsBtn = require('./dsBtn');

module.exports = (client) => {
	client.on('interactionCreate', async interaction => {
		try {
			if (interaction.isCommand()) {
				await client.commands[interaction.commandName].execute(interaction);
			}
			else if (interaction.isButton()) {
				dsBtn.pressed(interaction);
			}
			else {
				return;
			}
		}
		catch (error) {
			console.error(error);
			console.log(interaction);
			await interaction.reply({ content: 'There was an error with an interaction executing this command!', ephemeral: true });
		}
	});
};
