const dutyClockDB = require('./dutyClockDB');

module.exports.cleanHistoricals = async () => {
	const now = Math.floor(new Date().getTime() / 1000.0);
	const datetime = await dutyClockDB.cleanHistoricals(now);
	return datetime;
};