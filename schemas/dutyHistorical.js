const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const dutyHistoricalSchema = mongoose.Schema({
	uuid: reqString,
	charName: reqString,
	hexID: reqString,
	jobRole: reqString,
	clockIn: reqString,
	clockOut: reqString,
	minsWorked: reqString,
});

module.exports = mongoose.model('dutyHistorical', dutyHistoricalSchema);
