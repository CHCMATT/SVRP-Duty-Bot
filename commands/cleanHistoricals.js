const Discord = require('discord.js');

module.exports = {
	name: 'cleanhistoricals',
	description: 'Cleans all old duty log information from the Duty Clock Historical database.',
	permission: [
		{
			id: '749280137173925911', // Law Server Staff
			type: 'ROLE',
			permission: true,
		},
		{
			id: '666368348019359765', // Business Server Staff
			type: 'ROLE',
			permission: true,
		},
		{
			id: '826538019712532490', // Law IT
			type: 'ROLE',
			permission: true,
		},
		{
			id: '931484440524382210', // Business IT
			type: 'ROLE',
			permission: true,
		},
		{
			id: '749280136590786561', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
		{
			id: '650238228309213207', // @everyone in Business Discord
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