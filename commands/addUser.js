const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'adduser',
	description: 'Allows HR to add a users to the database for logging purposes.',
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
			id: '888571619734339594', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
		{
			id: '650238228309213207', // @everyone in Business Discord
			type: 'ROLE',
			permission: false,
		},
	],
	options: [
		{
			name: 'hex',
			description: 'Steam Hex ID',
			type: 'STRING',
			required: true,
		},
		{
			name: 'discordid',
			description: 'Discord ID',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const hex = interaction.options.getString('hex');
		const discordID = interaction.options.getString('discordid');
		await dutyClockDB.addUserInfo(hex, discordID);
		await interaction.reply(`Steam Hex ID \`${hex}\` was successfully linked to \`${discordID}\` in the database.`);
	},
};