const dutyClockDB = require('../dutyClockDB');

module.exports = {
	name: 'dbstats',
	description: 'Returns a list of the available statistics about the specified Database.',
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
			name: 'dbinput',
			description: 'Database Name',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const dbinput = interaction.options.getString('dbinput');
		if (dbinput === "clockedIn") {
			const dbstats = await dutyClockDB.clockedInStats();
			await interaction.reply(`Found the following information for the ${dbinput} database:\n\`\`\`${dbstats}\`\`\``);
		}
		else if (dbinput === "dutyHistorical") {
			const dbstats = await dutyClockDB.dutyHistoricalStats();
			await interaction.reply(`Found the following information for the ${dbinput} database:\n\`\`\`${dbstats}\`\`\``);
		}
		else if (dbinput === "dutyUsers") {
			const dbstats = await dutyClockDB.dutyUsersStats();
			await interaction.reply(`Found the following information for the ${dbinput} database:\n\`\`\`${dbstats}\`\`\``);
		}
		else {
			await interaction.reply(`Unable to find \`${dbinput}\` database. Please make sure you are spelling it correctly, and try again.`);
		}
	},
};
