const dutyClockDB = require('./dutyClockDB');
const messageHandle = require('./messageHandler');
const { v4: uuidv4 } = require('uuid');

module.exports.toTitleCase = async (str) => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

module.exports.cleanHistoricals = async () => {
	const now = Math.floor(new Date().getTime() / 1000.0);
	const datetime = await dutyClockDB.cleanHistoricals(now);
	return datetime;
};

module.exports.clockOutAll = async (client) => {
	const now = Math.floor(new Date().getTime() / 1000.0);
	const time = `<t:${now}:t>`;
	const dutyArray = await dutyClockDB.listDutyAll();
	const clockAction = 'off';
	for (x = 0; x < dutyArray.length; x++) {
		const hex = dutyArray[x].hexID;
		const charName = dutyArray[x].charName;
		const jobRole = dutyArray[x].jobRole;
		const clockInTimeObj = await dutyClockDB.getLatestClockIn(charName);
		if (clockInTimeObj !== null) {
			const clockInTime = await clockInTimeObj.clockInTime;
			const dutytime = (Math.round((now - clockInTime) / 60));
			text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
			text2 = `:red_circle: \`${charName}\` clocked off at ${time}. They clocked on at <t:${clockInTime}:t> and were clocked in for \`${dutytime}\` minutes.`;
			const uuid = uuidv4();
			await dutyClockDB.addHistoricalRecord(uuid, hex, charName, jobRole, clockInTime, now, dutytime);
		}
		else {
			const clockInTime = 'unknown';
			const dutytime = 'unknown';
			text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
			text2 = `:red_circle: \`${charName}\` clocked off at ${time}. They clocked on at \`${clockInTime}\` and were clocked in for \`${dutytime}\` minutes.`;
			const uuid = uuidv4();
			await dutyClockDB.addHistoricalRecord(uuid, hex, charName, jobRole, clockInTime, now, "0");
		}
		await dutyClockDB.clockOutUpdate(hex, charName, jobRole, now);
		if (jobRole === 'POLICE') {
			await client.channels.cache.get('925843917558124644').send(text2); // Sends message to PD log channel for HR
		}
		else if (jobRole === 'DOC') {
			await client.channels.cache.get('925843974860722196').send(text2); // Sends message to DOC log channel for HR
		}
		else if (jobRole === 'EMS') {
			await client.channels.cache.get('927830297834319942').send(text2); // Sends message to EMS log channel for HR
		}
		else {
			await client.channels.cache.get('923065033053855744').send(':bangbang: Help I\'ve fallen and can\'t get up. :(');
		}
		await client.channels.cache.get('923065033053855744').send(text); // Sends message to all logs channel
		const clockList = await dutyClockDB.clockOut(charName);
		await messageHandle.clockMessage(client, clockList);
	}
};