const dutyClockDB = require('../dutyClockDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lookupbyname',
	description: 'Allows HR to check a users information from the database.',
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
			name: 'name',
			description: 'Character Name',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const name = interaction.options.getString('name');
		const userInfoObj = await dutyClockDB.getUserInfoByName(name);
		if (userInfoObj !== null) {
			const lastCharName = userInfoObj.lastCharName;
			const lastJobRole = userInfoObj.lastJobRole;
			const lastClockIn = userInfoObj.lastClockIn;
			const lastClockOut = userInfoObj.lastClockOut;
			const hexFromDB = userInfoObj.hexID;

			const userInfoEmbed = await new MessageEmbed()
				.setTitle(`User Info for ${lastCharName}`)
				.setColor('#ff0039')
				.setDescription(`• **Hex ID:** \`${hexFromDB}\`\n• **Last Job Role:** \`${lastJobRole}\`\n• **Last Clock In Time:** <t:${lastClockIn}:f> (<t:${lastClockIn}:R>)\n• **Last Clock Out Time:** <t:${lastClockOut}:f> (<t:${lastClockOut}:R>)`)
				.setTimestamp();

			await interaction.reply({ embeds: [userInfoEmbed] });
		}
		else {
			await interaction.reply(`Employee \`${name}\` was not found in the Duty Clock database.`);
		}
	},
};