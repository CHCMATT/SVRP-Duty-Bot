const Discord = require('discord.js');

module.exports = {
	name: 'cleanhistoricals',
	description: 'Cleans all old duty log information from the Duty Clock Historical database.',
	permission: [
		{
			id: '749280137173925911', // Server Staff
			type: 'ROLE',
			permission: true,
		},
		{
			id: '826538019712532490', // IT
			type: 'ROLE',
			permission: true,
		},
		{
			id: '749280136590786561', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
	],
	async execute(interaction) {
		const btns = confirmDenyBtns();
		await interaction.reply({
			content: 'Are you sure you want to clean the Duty Clock Historical database?',
			components: [btns],
		});
	},
};

function confirmDenyBtns() {
	const row = new Discord.MessageActionRow().addComponents(
		new Discord.MessageButton()
			.setCustomId('confirmCH')
			.setLabel('Confirm')
			.setStyle('SUCCESS'),
		new Discord.MessageButton()
			.setCustomId('cancelCH')
			.setLabel('Cancel')
			.setStyle('DANGER'),
	);
	return row;
}