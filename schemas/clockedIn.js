const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const clockedInSchema = mongoose.Schema({
	hexID: reqString,
	charName: reqString,
	jobRole: reqString,
});

module.exports = mongoose.model('clockedIn', clockedInSchema);
