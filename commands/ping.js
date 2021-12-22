module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	permission: [
		{
			id: '749280136590786561', // @everyone in Law Discord
			type: 'ROLE',
			permission: true,
		},
	],
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};