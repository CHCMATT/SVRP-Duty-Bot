const dutyClockDB = require('../dutyClockDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'historicallookup',
	description: 'Allows HR to search a user\'s history in the database via their name.',
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
			id: '749280137157148677', // LSPD HR
			type: 'ROLE',
			permission: true,
		},
		{
			id: '749280137157148676', // BCSO HR
			type: 'ROLE',
			permission: true,
		},
		{
			id: '785546331497824307', // SADOC HR
			type: 'ROLE',
			permission: true,
		},
		{
			id: '749280136590786561', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
	],
	options: [
		{
			name: 'officername',
			description: 'Officer Name',
			type: 'STRING',
			required: true,
		},
		{
			name: 'numdays',
			description: 'Number of Days',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const charname = interaction.options.getString('officername');
		const numdays = interaction.options.getString('numdays');
		if (numdays <= 30) {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const timeframe = now - (86400 * numdays);
			const clockInsObj = await dutyClockDB.lookupHistoricals(charname, timeframe);
			if (clockInsObj.length !== 0) {
				interaction.reply(`Found the following information for Officer \`${charname}\` within the last \`${numdays}\` days: \`\`\`\n${clockInsObj}\`\`\``);
			}
			else {
				interaction.reply(`Officer \`${charname}\` does not have any history for the last \`${numdays}\` days.`);
			}
		}
		else {
			interaction.reply(`Unable to look up for the timeframe \`${numdays}\`. Please ensure this value is a number, and it is less than 30.`);
		}
	},
};