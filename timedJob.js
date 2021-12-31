const dutyClockDB = require('./dutyClockDB');
const messageHandle = require('./messageHandler');
const { CronJob } = require('cron');

async function amResetJob() {
	await dutyClockDB.resetClock();
	await client.channels.cache.get('923065033053855744').send('The Duty Clock database has been successfully reset by `Scheduled Job (5am EST)`.');
	await messageHandle.clockMessage(client, clockList);
}

async function pmResetJob() {
	await dutyClockDB.resetClock();
	await client.channels.cache.get('923065033053855744').send('The Duty Clock database has been successfully reset by `Scheduled Job (5pm EST)`.');
	await messageHandle.clockMessage(client, clockList);
}

const job5am = new CronJob('0 0 5 * * *', () => { amResetJob; });
const job5pm = new CronJob('0 0 17 * * *', () => { pmResetJob; });

job5am.start();
job5pm.start();