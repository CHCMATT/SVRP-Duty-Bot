const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'adduser',
	description: 'Allows HR to add a users to the database for logging purposes.',
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
			id: '913084847872954428', // SASP HR
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