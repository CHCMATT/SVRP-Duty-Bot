const dutyClockDB = require('./dutyClockDB');

module.exports.pressed = async (interaction) => {
	try {
		const message = interaction.message;
		const buttonID = interaction.customId;
		let hex = '';
		let checkForHex = false;
		switch (buttonID) {
		case 'confirmAdd':
			hex = message.content.split('`')[1];
			dutyClockDB.addHex(hex);
			interaction.update({ content: `Steam Hex \`${hex}\` was **successfully added** to the database!`, components:[] });
			break;
		case 'cancelAdd':
			hex = message.content.split('`')[1];
			interaction.update({ content: `Interaction cancelled: Steam Hex \`${hex}\` was **not added** to the database.`, components:[] });
			break;
		case 'confirmRem':
			hex = message.content.split('`')[1];
			checkForHex = await dutyClockDB.removeHex(hex);
			if (checkForHex) {
				interaction.update({ content: `Steam Hex \`${hex}\` was **successfully removed** from the database!`, components:[] });
			}
			else {
				interaction.update({ content: `Steam Hex \`${hex}\` was **unable to be found** in the database.`, components:[] });
			}
			break;
		case 'cancelRem':
			hex = message.content.split('`')[1];
			interaction.update({ content: `Interaction cancelled: Steam Hex \`${hex}\` was **not removed** from the database.`, components:[] });
			break;
		default:
			interaction.reply('I\'m not familiar with this button. Please tag CHCMATT to fix this');
			console.log(`ERROR: unrecognized button ${interaction.customId}`);
		}
	}
	catch (error) {
		console.log('error in button press');
		console.error(error);
	}
};