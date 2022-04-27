const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'checkduty',
	description: 'Checks if an employee is located in the Duty Clock database.',
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
	options: [
		{
			name: 'employeename',
			description: 'Employee Name',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const empname = interaction.options.getString('employeename');
		const checkDuty = await dutyClockDB.checkDuty(empname);
		if (checkDuty) {
			interaction.reply(`Employee \`${empname}\` is **clocked on** duty.`);
		}
		else {
			interaction.reply(`Employee\`${empname}\` is **not clocked on** duty.`);
		}
	},
};