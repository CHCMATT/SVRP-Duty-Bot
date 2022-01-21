const dutyClockDB = require('../dutyClockDB');
const messageHandle = require('../messageHandler');

module.exports = {
	name: 'resetclock',
	description: '(deprecated) Resets the Duty Clock database in case of catastrophic failure.',
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
			name: 'conf',
			description: 'Confirmation String',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction, client) {
		const conf = interaction.options.getString('conf');
		const user = interaction.member.user.username;
		if (conf == 'confirm') {
			const clockList = await dutyClockDB.resetClock();
			await interaction.reply(`The Duty Clock databases have been successfully reset by \`${user}\`.`);
			await messageHandle.clockMessage(client, clockList);
		}
		else {
			await interaction.reply({ content: 'This request has been cancelled. Are you sure you meant to do this? Please type "Confirm" into the box next time if so.', ephemeral: true });
		}
	},
};