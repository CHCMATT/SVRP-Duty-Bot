const dutyClockDB = require('../dutyClockDB');
const messageHandle = require('../messageHandler');
const { v4: uuidv4 } = require('uuid');

module.exports = {
	name: 'clockout',
	description: 'Force removes a user from the Duty Clock database.',
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
			id: '888571619734339594', // @everyone in Law Discord
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
		const charnamestr = interaction.options.getString('employeename');
		const user = interaction.member.user.username;
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		const charInfoOjb = await dutyClockDB.getInfoFromName(charnamestr);
		if (charInfoOjb !== null) {
			const clockInTime = await charInfoOjb.clockInTime;
			const charName = await charInfoOjb.charName;
			const jobRole = await charInfoOjb.jobRole;
			const hex = await charInfoOjb.hexID;
			const clockAction = 'off';
			const dutytime = (Math.round((now - clockInTime) / 60));
			text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
			text2 = `:red_circle: \`${charName}\` clocked off at ${time}. They clocked on at <t:${clockInTime}:t> and were clocked in for \`${dutytime}\` minutes.`;
			const uuid = uuidv4();
			await dutyClockDB.addHistoricalRecord(uuid, hex, charName, jobRole, clockInTime, now, dutytime);
			await dutyClockDB.clockOutUpdate(hex, charName, jobRole, now);
			if (jobRole === 'POLICE') {
				await interaction.client.channels.cache.get('925843917558124644').send(text2); // Sends message to PD log channel for HR
			}
			else if (jobRole === 'DOC') {
				await interaction.client.channels.cache.get('925843974860722196').send(text2); // Sends message to DOC log channel for HR
			}
			else if (jobRole === 'EMS') {
				await interaction.client.channels.cache.get('927830297834319942').send(text2); // Sends message to EMS log channel for HR
			}
			else {
				await interaction.client.channels.cache.get('923065033053855744').send(':bangbang: Help I\'ve fallen and can\'t get up. :(');
			}
			await interaction.client.channels.cache.get('923065033053855744').send(text); // Sends message to all logs channel
			const clockList = await dutyClockDB.clockOut(charName);
			await messageHandle.clockMessage(interaction.client, clockList);
			text3 = `\`${charName}\` was force clocked off by \`${user}\` at ${time}.`;
			await interaction.reply(text3);
		}
		else {
			interaction.reply(`Employee \`${charnamestr}\` is not clocked in right now.`);
		}
	},
};