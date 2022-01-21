const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const dutyUsersSchema = mongoose.Schema({
	hexID: reqString,
	discordID: reqString,
	lastCharName: reqString,
	lastJobRole: reqString,
	lastClockIn: reqString,
	lastClockOut: reqString,
	totalClockTime: reqString,
	weekClockTime: reqString,
});

module.exports = mongoose.model('dutyUsers', dutyUsersSchema);
