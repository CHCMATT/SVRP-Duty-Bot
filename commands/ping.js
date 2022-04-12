module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	permission: [
		{
			id: '888571619734339594', // @everyone in Law Discord
			type: 'ROLE',
			permission: true,
		},
	],
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};