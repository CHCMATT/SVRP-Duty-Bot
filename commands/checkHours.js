const dutyClockDB = require('../dutyClockDB');
const { MessageEmbed } = require('discord.js');
const functions = require('../functions');

module.exports = {
	name: 'checkhours',
	description: 'Allows HR to search a user\'s hours in the database via their name.',
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
			id: '749294375900545064', // SALE High Command
			type: 'ROLE',
			permission: true,
		},
		{
			id: '961801396297031721', // LSPD HR
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
			id: '651219515316633610', // PB HC
			type: 'ROLE',
			permission: true,
		},
		{
			id: '842400298622648320', // PB HR
			type: 'ROLE',
			permission: true,
		},
		{
			id: '926596785277894717', // PB Command
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
		{
			name: 'numdays',
			description: 'Number of Days',
			type: 'STRING',
			required: false,
		},
	],
	async execute(interaction) {
		let charname = interaction.options.getString('employeename');
		charname = await functions.toTitleCase(charname);
		if (interaction.options.getString('numdays') !== null) {
			global.numdays = interaction.options.getString('numdays');
		}
		else {
			global.numdays = 30;
		}
		if (numdays <= 40) {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const timeframe = now - (86400 * numdays);
			const clockInsObj = await dutyClockDB.lookupHistoricals(charname, timeframe);
			if (clockInsObj.length !== 0) {
				var totalMinsWorked = 0;
				clockInsObj.forEach(element => {
					totalMinsWorked = +totalMinsWorked + +element.minsWorked;
				});
				totalHoursWorked = Math.round((totalMinsWorked / 60));
				interaction.reply(`Employee \`${charname}\` has clocked in \`${clockInsObj.length}\` times, for a total of \`${totalHoursWorked}\` hours (\`${totalMinsWorked}\` minutes) worked within the past \`${numdays}\` days.`);
			}
			else {
				interaction.reply(`Unable to find any record of employee \`${charname}\` within the past \`${numdays}\` days.`);
			}
		}
		else {
			interaction.reply(`Unable to look up for the timeframe of \`${numdays}\` days. Please ensure this value is a number, and less than 40.`);
		}
	},
};