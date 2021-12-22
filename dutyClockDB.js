const mongo = require('./mongo');
const dutyClock = require('./schemas/clockedIn');

module.exports.checkDuty = async (hexID) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await dutyClock.findOne({
				hexID,
			});
			let found = false;
			if (result) {
				found = true;
			}
			else {
				return;
			}
			return found;
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.clockOn = async (hexID, charName, jobRole) => {
	return await mongo().then(async (mongoose) => {
		try {
			await dutyClock.findOneAndUpdate(
				{ hexID },
				{ hexID, charName, jobRole },
				{ upsert: true,
					new: true },
			);
			const list = (await dutyClock.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.clockOff = async (hexID) => {
	return await mongo().then(async (mongoose) => {
		try {
			await dutyClock.findOneAndDelete({
				hexID,
			});
			const list = (await dutyClock.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.listDuty = async () => {
	return await mongo().then(async (mongoose) => {
		try {
			const list = (await dutyClock.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			mongoose.connection.close();
		}
	});
};