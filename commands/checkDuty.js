const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'checkduty',
	description: 'Checks a hex to see if it is located in the Duty Clock database.',
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
			id: '888571619734339594', // @everyone in Law Discord
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
	],
	async execute(interaction) {
		const hex = interaction.options.getString('hex');
		const checkForHex = await dutyClockDB.checkDuty(hex);
		if (checkForHex) {
			interaction.reply(`Steam Hex \`${hex}\` is **clocked on** duty.`);
		}
		else {
			interaction.reply(`Steam Hex \`${hex}\` is **not clocked on** duty.`);
		}
	},
};