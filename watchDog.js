const dutyClockDB = require('./dutyClockDB');
const messageHandle = require('./messageHandler');

module.exports = (client) => {
	client.on('messageCreate', async (message) => {
		const name = message.channel.name;
		if (name == 'duty-log-main') {
			await dutyClock(message.content, client);
		}
	});
};

async function dutyClock(discordmessage, client) {
	const split = discordmessage.split('\n');
	const clockAction = split[0].split(' ')[2].toLowerCase();
	const charName = split[3].split(': ')[1];
	const hex = split[5].split(':')[2];
	const jobRole = split[6].split(': ')[1];
	if (clockAction === 'on') {
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		text = `:green_circle: \`${charName}\` clocked \`${clockAction}\` to \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
		text2 = `:green_circle: \`${charName}\` clocked on at ${time}.`;
		if (jobRole === 'POLICE') { await client.channels.cache.get('925843917558124644').send(text2); } // Sends message to PD log channel for HR
		else if (jobRole === 'DOC') { await client.channels.cache.get('925843974860722196').send(text2); } // Sends message to DOC log channel for HR
		else if (jobRole === 'EMS') { await client.channels.cache.get('925846741226516601').send(text2); } // Sends message to EMS log channel for HR
		else { await client.channels.cache.get('923065033053855744').send(':bangbang: Help I\'ve fallen and can\'t get up. :('); }
		await client.channels.cache.get('923065033053855744').send(text); // Sends message to all logs channel
		const clockList = await dutyClockDB.clockOn(hex, charName, jobRole.toLowerCase(), now);
		await dutyClockDB.setLatestClockIn(hex, now);
		await messageHandle.clockMessage(client, clockList);
	}
	else if (clockAction === 'off') {
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		const clockInTimeObj = await dutyClockDB.getLatestClockIn(hex);
		if (clockInTimeObj !== null) {
			const clockInTime = clockInTimeObj.lastClockInTime;
			const dutytime = (Math.round((now - clockInTime) / 60));
			text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
			text2 = `:red_circle: \`${charName}\` clocked off at ${time}. They clocked on at <t:${clockInTime}:t> and were clocked in for \`${dutytime}\` minutes.`;
		}
		else {
			text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
			text2 = `:red_circle: \`${charName}\` clocked off at ${time}. They were clocked in for \`unknown\` minutes.`;
		}
		if (jobRole === 'POLICE') { await client.channels.cache.get('925843917558124644').send(text2); } // Sends message to PD log channel for HR
		else if (jobRole === 'DOC') { await client.channels.cache.get('925843974860722196').send(text2); } // Sends message to DOC log channel for HR
		else if (jobRole === 'EMS') { await client.channels.cache.get('925846741226516601').send(text2); } // Sends message to EMS log channel for HR
		else { await client.channels.cache.get('923065033053855744').send(':bangbang: Help I\'ve fallen and can\'t get up. :('); }
		await client.channels.cache.get('923065033053855744').send(text); // Sends message to all logs channel
		const clockList = await dutyClockDB.clockOff(hex);
		await messageHandle.clockMessage(client, clockList);
	}
	else {
		console.log('[watchDog.js] Error checking duty status.');
	}
}