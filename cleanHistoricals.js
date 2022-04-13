const dutyClockDB = require('./dutyClockDB');

module.exports.cleanHistoricals = async () => {
	const now = Math.floor(new Date().getTime() / 1000.0);
	await dutyClockDB.cleanHistoricals(now);
};