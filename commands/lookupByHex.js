const dutyClockDB = require('../dutyClockDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lookupbyhex',
	description: 'Allows HR to check a users information from the database.',
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
			id: '785546331497824307', // SADOC HR
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
		const userInfoObj = await dutyClockDB.getUserInfoByHex(hex);
		if (userInfoObj !== null) {
			const lastCharName = userInfoObj.lastCharName;
			const lastJobRole = userInfoObj.lastJobRole;
			const lastClockIn = userInfoObj.lastClockIn;
			const lastClockOut = userInfoObj.lastClockOut;
			const hexFromDB = userInfoObj.hexID;

			const userInfoEmbed = await new MessageEmbed()
				.setTitle(`User Info for ${hex}`)
				.setColor('#ff0039')
				.setDescription(`• **Hex ID:** \`${hexFromDB}\`\n• **Last Char Name:** \`${lastCharName}\`\n• **Last Job Role:** \`${lastJobRole}\`\n• **Last Clock In Time:** <t:${lastClockIn}:f> (<t:${lastClockIn}:R>)\n• **Last Clock Out Time:** <t:${lastClockOut}:f> (<t:${lastClockOut}:R>)`)
				.setTimestamp();

			await interaction.reply({ embeds: [userInfoEmbed] });
		}
		else {
			await interaction.reply(`Hex ID \`${hex}\` was not found in the Duty Clock database.`);
		}
	},
};