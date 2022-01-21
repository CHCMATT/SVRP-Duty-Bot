const mongo = require('./mongo');
const clockedIn = require('./schemas/clockedIn');
const dutyUsers = require('./schemas/dutyUsers');

module.exports.checkDuty = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const result = await clockedIn.findOne({
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
			// mongoose.connection.close();
		}
	});
};

module.exports.clockIn = async (hexID, charName, jobRole, clockInTime) => {
	return await mongo().then(async () => {
		try {
			await clockedIn.findOneAndUpdate(
				{ hexID },
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

module.exports.clockOut = async (hexID) => {
	return await mongo().then(async () => {
		try {
			await clockedIn.findOneAndDelete({
				hexID,
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

module.exports.getLatestClockIn = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const LCI = await clockedIn.findOne({ hexID }, { clockInTime: 1, _id: 0 });
			return LCI;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.getInfoFromHex = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const info = await clockedIn.findOne({ hexID }, { hexID: 1, charName: 1, jobRole: 1, clockInTime: 1, _id: 0 });
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
				{ hexID },
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
				{ hexID },
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

module.exports.getUserInfo = async (hexID) => {
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