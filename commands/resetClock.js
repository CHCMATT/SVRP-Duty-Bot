const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'resetclock',
	description: 'Resets the Duty Clock database in case of catastrophic failure. Please type the word "confirm" to make sure you know what you\'re doing.',
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
	async execute(interaction) {
		const conf = interaction.options.getString('conf');
		const member = interaction.member.displayName();
		if (conf == 'confirm') {
			await dutyClockDB.drop();
			await interaction.reply('The Duty Clock has been successfully reset!');
			await client.channels.cache.get('923065033053855744').send(`:bangbang: The duty clock database has been reset by ${member}.`);
		}
		else {
			await interaction.reply({ content: 'This request has been cancelled. Are you sure you meant to do this? Please type "Confirm" into the box next time if so.', ephemeral: true });
		}
	},
};