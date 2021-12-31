const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const latestClockInSchema = mongoose.Schema({
	hexID: reqString,
	lastClockInTime: reqString,
});

module.exports = mongoose.model('latestClockIn', latestClockInSchema);
