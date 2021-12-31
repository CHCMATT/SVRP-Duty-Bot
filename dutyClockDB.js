const mongo = require('./mongo');
const dutyClock = require('./schemas/clockedIn');
const latestClockIn = require('./schemas/latestClockIn');


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

module.exports.clockOn = async (hexID, charName, jobRole, clockOn) => {
	return await mongo().then(async (mongoose) => {
		try {
			await dutyClock.findOneAndUpdate(
				{ hexID },
				{ hexID, charName, jobRole, clockOn },
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

module.exports.resetClock = async () => {
	return await mongo().then(async (mongoose) => {
		try {
			await dutyClock.deleteMany({});
			await latestClockIn.deleteMany({});
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.setLatestClockIn = async (hexID, lastClockInTime) => {
	await mongo().then(async (mongoose) => {
		try {
			await latestClockIn.findOneAndUpdate(
				{ hexID },
				{ hexID, lastClockInTime },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.getLatestClockIn = async (hexID) => {
	return await mongo().then(async (mongoose) => {
		try {
			const LCI = await latestClockIn.findOne({ hexID }, { lastClockInTime: 1, _id: 0 });
			return LCI;
		}
		finally {
			mongoose.connection.close();
		}
	});
};