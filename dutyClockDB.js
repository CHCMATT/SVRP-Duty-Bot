const mongo = require('./mongo');
const clockedIn = require('./schemas/clockedIn');
const dutyUsers = require('./schemas/dutyUsers');
const dutyHistorical = require('./schemas/dutyHistorical');

module.exports.checkDuty = async (charName) => {
	return await mongo().then(async () => {
		try {
			const result = await clockedIn.findOne({
				charName,
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
			// mongoose.connection.close();
		}
	});
};

module.exports.clockIn = async (hexID, charName, jobRole, clockInTime) => {
	return await mongo().then(async () => {
		try {
			await clockedIn.findOneAndUpdate(
				{ charName },
				{ hexID, charName, jobRole, clockInTime },
				{ upsert: true,
					new: true },
			);
			const list = (await clockedIn.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.clockOut = async (charName) => {
	return await mongo().then(async () => {
		try {
			await clockedIn.findOneAndDelete({
				charName,
			});
			const list = (await clockedIn.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.listDutyCharJobs = async () => {
	return await mongo().then(async () => {
		try {
			const list = (await clockedIn.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.listDutyAll = async () => {
	return await mongo().then(async () => {
		try {
			const list = (await clockedIn.find({}, { hexID: 1, charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.resetClock = async () => {
	return await mongo().then(async () => {
		try {
			await clockedIn.deleteMany({});
			const list = (await clockedIn.find({}, { charName: 1, jobRole: 1, _id: 0 }));
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getLatestClockIn = async (charName) => {
	return await mongo().then(async () => {
		try {
			var LCI = await clockedIn.findOne({ charName }, { clockInTime: 1, charName: 1, _id: 0 });
			return LCI;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getClockOutInfo = async (lastCharName) => {
	return await mongo().then(async () => {
		try {
			const info = await clockedIn.findOne({ charName: lastCharName }, { hexID: 1, charName: 1, jobRole: 1, clockInTime: 1, _id: 0 });
			return info;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.addUserInfo = async (hexID, discordID) => {
	return await mongo().then(async () => {
		try {
			await dutyUsers.findOneAndUpdate(
				{ hexID },
				{ hexID, discordID },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.clockInUpdate = async (hexID, lastCharName, lastJobRole, lastClockIn) => {
	return await mongo().then(async () => {
		try {
			await dutyUsers.findOneAndUpdate(
				{ lastCharName },
				{ hexID, lastCharName, lastJobRole, lastClockIn },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.clockOutUpdate = async (hexID, lastCharName, lastJobRole, lastClockOut) => {
	return await mongo().then(async () => {
		try {
			await dutyUsers.findOneAndUpdate(
				{ lastCharName },
				{ hexID, lastCharName, lastJobRole, lastClockOut },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getDiscID = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const discid = await dutyUsers.findOne({ hexID }, { discordID: 1, _id: 0 });
			return discid;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getUserInfoByHex = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const queryinfo = await dutyUsers.findOne({ hexID }, { hexID: 1, discordID: 1, lastJobRole: 1, lastCharName: 1, lastClockIn: 1, lastClockOut: 1, _id: 0 });
			return queryinfo;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getUserInfoByName = async (lastCharName) => {
	return await mongo().then(async () => {
		try {
			const queryinfo = await dutyUsers.findOne({ lastCharName }, { hexID: 1, discordID: 1, lastJobRole: 1, lastCharName: 1, lastClockIn: 1, lastClockOut: 1, _id: 0 });
			return queryinfo;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.addHistoricalRecord = async (uuid, hexID, charName, jobRole, clockIn, clockOut, minsWorked) => {
	return await mongo().then(async () => {
		try {
			await dutyHistorical.findOneAndUpdate(
				{ uuid },
				{ uuid, hexID, charName, jobRole, clockIn, clockOut, minsWorked },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.cleanHistoricals = async (now) => {
	return await mongo().then(async () => {
		try {
			thirtyDaysAgo = now - (86400 * 30);
			await dutyHistorical.deleteMany(
				{ clockOut: { $lt: thirtyDaysAgo } },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getInfoFromName = async (charName) => {
	return await mongo().then(async () => {
		try {
			const info = await clockedIn.findOne({ charName }, { hexID: 1, charName: 1, jobRole: 1, clockInTime: 1, _id: 0 });
			return info;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.lookupHistoricals = async (charName, timeframe) => {
	return await mongo().then(async () => {
		try {
			const found = await dutyHistorical.find(
				{ charName, clockOut: { $gt: timeframe } },
			);
			return found;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};