const dutyClockDB = require('./dutyClockDB');
const messageHandle = require('./messageHandler');

module.exports = (client) => {
	client.on('messageCreate', async (message) => {
		const name = message.channel.name;
		if (name == 'duty-log') {
			await dutyClock(message.content, message.guild, client);
		}
	});
};

async function dutyClock(discordmessage, guild, client) {
	const split = discordmessage.split('\n');
	const clockAction = split[0].split(' ')[2].toLowerCase();
	const charName = split[3].split(': ')[1];
	const hex = split[5].split(':')[2];
	const jobRole = split[6].split(': ')[1];
	if (clockAction === 'on') {
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		text = `:green_circle: \`${charName}\` clocked \`${clockAction}\` to \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
		await client.channels.cache.get('923065033053855744').send(text);
		const clockList = await dutyClockDB.clockOn(hex, charName, jobRole.toLowerCase());
		await messageHandle.clockMessage(client, clockList);
	}
	else if (clockAction === 'off') {
		const now = Math.floor(new Date().getTime() / 1000.0);
		const time = `<t:${now}:t>`;
		text = `:red_circle: \`${charName}\` clocked \`${clockAction}\` from \`${jobRole}\` at ${time} with Hex ID \`${hex}\`.`;
		await client.channels.cache.get('923065033053855744').send(text);
		const clockList = await dutyClockDB.clockOff(hex);
		await messageHandle.clockMessage(client, clockList);
	}
	else {
		console.log('[watchDog.js] Error checking duty status.');
	}
}