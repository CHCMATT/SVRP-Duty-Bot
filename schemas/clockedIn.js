const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const clockedInSchema = mongoose.Schema({
	hexID: reqString,
	charName: reqString,
	jobRole: reqString,
	clockOn: reqString,
});

module.exports = mongoose.model('clockedIn', clockedInSchema);
