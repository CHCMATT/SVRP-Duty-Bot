module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	permission: [
		{
			id: '888571619734339594', // @everyone in Law Discord
			type: 'ROLE',
			permission: true,
		},
		{
			id: '650238228309213207', // @everyone in Business Discord
			type: 'ROLE',
			permission: true,
		},
	],
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};