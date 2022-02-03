const { Client, Collection, Intents } = require('discord.js');
const mongo = require('./mongo');
const fs = require('fs');
const cron = require('node-cron');
const config = require('./config.json');
const messageLog = require('./watchDog');
const interact = require('./interactions');
const messageHandle = require('./messageHandler');
const COA = require('./clockOutAllUsers');
const dutyClockDB = require('./dutyClockDB');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES);
const client = new Client({ intents: myIntents });
client.commands = new Collection();
client.buttons = new Collection();

client.once('ready', async () => {
	console.log('[app-duty.js] The client is starting up!');
	client.dutyPd = {};
	client.dutyEms = {};
	await mongo().then(() => {
		try {
			console.log('[app-duty.js] Connected to mongo!');
		}
		finally {
			// mongoose.connection.close();
		}
	});

	async function amResetJob() {
		await client.channels.cache.get('923065033053855744').send(':bangbang: The Duty Clock database has been successfully reset by `Scheduled Job (5am EST)`.');
		COA.clockOutAll(client);
	}

	async function pmResetJob() {
		await client.channels.cache.get('923065033053855744').send(':bangbang: The Duty Clock database has been successfully reset by `Scheduled Job (5pm EST)`.');
		COA.clockOutAll(client);
	}

	cron.schedule('0 1 5 * * *', function() { amResetJob(); });
	cron.schedule('0 1 17 * * *', function() { pmResetJob(); });

	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Find all the files in the command folder that end with .js
	const cmdList = []; // Create an empty array for pushing each command file to
	for (const file of commandFiles) { // For each file in command files group
		const command = require(`./commands/${file}`); // Get the information that is in the file
		console.log(`[app-duty.js] Added ${file}!`); // Log that the command was added
		cmdList.push(command); // push that command to the array
		client.commands[command.name] = command; // Save the command name and command information to the client
	}
	const allCommands = await client.guilds.cache.get('749280136590786561').commands.set(cmdList) // Sets all the commands
		.catch(console.error);
	const cmdIDs = allCommands.keys();
	for (let i = 0; i < allCommands.size; i++) {
		const cmdID = cmdIDs.next().value;
		const cmdName = await allCommands.get(cmdID).name;
		let permission = client.commands[cmdName].permission;
		if(permission != undefined) { // If no permissions are given, don't update any permissions
			if(permission.length == undefined) { // If the permission isn't already an array (more than 1 permission), turn it into an array as that is what the function requires
				permission = [permission];
			}
			client.guilds.cache.get('749280136590786561').commands.permissions.set({ command: cmdID, permissions: permission })
				.catch(console.error);
		}
	}

	interact(client); // Fire whenever an interaction is created
	messageLog(client);
	await client.channels.cache.get('923065033053855744').send(':bangbang: The bot has started up.');
	await client.channels.cache.get('791852229983600671').bulkDelete(5); // PD channel
	await client.channels.cache.get('923065033053855744').send(':bangbang: Cleared <#791852229983600671> channel of old messages.');
	await client.channels.cache.get('927830243086061628').bulkDelete(5); // EMS channel
	await client.channels.cache.get('923065033053855744').send(':bangbang: Cleared <#927830243086061628> channel of old messages.');
	const charArray = await dutyClockDB.listDutyCharJobs();
	await messageHandle.clockMessage(client, charArray);
	await client.channels.cache.get('923065033053855744').send(':bangbang: Sent new Duty Clock message in <#791852229983600671>.');
	await client.channels.cache.get('923065033053855744').send(':bangbang: Sent new Duty Clock message in <#927830243086061628>.');
	console.log(`[app-duty.js] Connected to ${client.guilds.cache.size} guild(s).`); // Lists the number of guilds that the client is connected to
	const keys = client.guilds.cache.keys(); // Gets the keys for the map object from the guilds object
	for (const entry of keys) { // For each guild
		console.log(`[app-duty.js] Connected to guild ID ${entry}.`); // Log the guild Key (guild.id)
	}
	console.log('[app-duty.js] Client is ready.');
});

client.login(config.token);