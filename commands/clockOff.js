const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'clockoff',
	description: 'Force removes a user from the Duty Clock database.',
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
		const user = interaction.member.user.username;
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		text = `\`${hex}\` was force clocked off by \`${user}\` at ${time}. The Duty Clock will update the next time someone clocks on or off.`;
		await dutyClockDB.clockOff(hex);
		await interaction.reply(text);
	},
};