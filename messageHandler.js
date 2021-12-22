const { MessageEmbed } = require('discord.js');

module.exports.clockMessage = async (client, charArray) => {
	const pdDutyList = [];
	const docDutyList = [];
	const emsDutyList = [];
	charArray.forEach(element => {
		if (element.jobRole == 'police') {
			pdDutyList.push(element.charName);
		}
		else if (element.jobRole == 'doc') {
			docDutyList.push(element.charName);
		}
		else if (element.jobRole == 'ems') {
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

	if (Object.keys(client.duty).length === 0) {
		client.duty = await client.channels.cache.get('791852229983600671').send({ embeds: [pdEmbed, docEmbed, emsEmbed] });
	}
	else {
		client.duty.edit({ embeds: [pdEmbed, docEmbed, emsEmbed] });
	}
};