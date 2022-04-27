const dutyClockDB = require('../dutyClockDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'listduty',
	description: 'Lists all of the people in the Duty Clock database for the specified role.',
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
			name: 'role',
			description: 'POLICE, DOC, EMS, or All',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const role = interaction.options.getString('role').toUpperCase();
		const dutyList = [];
		const pdDutyList = [];
		const docDutyList = [];
		const emsDutyList = [];
		const charArray = await dutyClockDB.listDutyCharJobs();
		if (role == 'POLICE' || role == 'EMS' || role == 'DOC') {
			charArray.forEach(element => {
				if (element.jobRole == role) {
					dutyList.push(element.charName);
				}
			});

			let descList = '';

			for (i = 0; i < dutyList.length; i++) {
				descList = descList.concat('\n', `• **${i + 1}:** ${dutyList[i]}`);
			}

			if (descList == '') {
				descList = ':cry: There is no one on duty for this role.';
			}
			const dutyListEmbed = new MessageEmbed()
				.setTitle(`List of all people clocked in for the ${role} role:`)
				.setDescription(descList)
				.setTimestamp();

			if (role == 'POLICE') {dutyListEmbed.setColor('#2d6eb9');} // pd
			else if (role == 'DOC') {dutyListEmbed.setColor('#8466e2');} // doc
			else if (role == 'EMS') {dutyListEmbed.setColor('#e98fa6');} // ems
			else {dutyListEmbed.setColor('#cc0000');} // error

			interaction.reply({ embeds: [dutyListEmbed] });
		}
		else if (role == 'ALL') {
			charArray.forEach(element => {
				if (element.jobRole == 'POLICE') {
					pdDutyList.push(element.charName);
				}
				else if (element.jobRole == 'DOC') {
					docDutyList.push(element.charName);
				}
				else if (element.jobRole == 'EMS') {
					emsDutyList.push(element.charName);
				}
			});

			let pdDescList = '';
			let docDescList = '';
			let emsDescList = '';

			for (i = 0; i < pdDutyList.length; i++) {
				pdDescList = pdDescList.concat('\n', `• **${i + 1}:** ${pdDutyList[i]}`);
			}
			for (i = 0; i < docDutyList.length; i++) {
				docDescList = docDescList.concat('\n', `• **${i + 1}:** ${docDutyList[i]}`);
			}
			for (i = 0; i < emsDutyList.length; i++) {
				emsDescList = emsDescList.concat('\n', `• **${i + 1}:** ${emsDutyList[i]}`);
			}

			if (pdDescList == '') {
				pdDescList = ':cry: There is no one on duty for this role.';
			}
			if (docDescList == '') {
				docDescList = ':cry: There is no one on duty for this role.';
			}
			if (emsDescList == '') {
				emsDescList = ':cry: There is no one on duty for this role.';
			}

			const pdEmbed = new MessageEmbed()
				.setTitle('Clocked in for PD:')
				.setDescription(pdDescList)
				.setColor('#2d6eb9');
			const docEmbed = new MessageEmbed()
				.setTitle('Clocked in for DOC:')
				.setDescription(docDescList)

				.setColor('#8466e2');
			const emsEmbed = new MessageEmbed()
				.setTitle('Clocked in for EMS:')
				.setDescription(emsDescList)
				.setTimestamp()
				.setColor('#e98fa6');

			interaction.reply({ embeds: [pdEmbed, docEmbed, emsEmbed] });
		}
		else {
			interaction.reply(`Unable to find role \`${role}\` - please make sure you are spelling the role correctly.`);
		}
	},
};