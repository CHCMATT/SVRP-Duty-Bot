const COA = require('./clockOutAllUsers');
const CH = require('./cleanHistoricals');

module.exports.pressed = async (interaction, client) => {
	try {
		const buttonID = interaction.customId;
		switch (buttonID) {
		case 'confirmCOA':
			await client.channels.cache.get('923065033053855744').send(`:bangbang: The Duty Clock database has been reset by \`${interaction.member.user.username}\`.`);
			COA.clockOutAll(client);
			interaction.update({ content: 'The Duty Clock was successfully reset!', components:[] });
		break;
		case 'cancelCOA':
			interaction.update({ content: 'Interaction cancelled - the Duty Clock was not reset.', components:[] });
			break;
			case 'confirmCH':
				const datetime = await CH.cleanHistoricals(client);
				await client.channels.cache.get('923065033053855744').send(`:bangbang: The Duty Clock Historical database has cleaned up any records older than <t:${datetime}:f>. Job initiated by \`${interaction.member.user.username}\`.`);
				interaction.update({ content: 'The Duty Clock historical databsse was successfully cleaned of old records!', components:[] });
			break;
			case 'cancelCH':
				interaction.update({ content: 'Interaction cancelled - the Duty Clock was not cleaned of any historical records.', components:[] });
				break;
		default:
			interaction.reply('I\'m not familiar with this button press. Please tag @CHCMATT to fix this');
			console.log(`Error: Unrecognized button press: ${interaction.customId}`);
		}
	}
	catch (error) {
		console.log('Error in button press!');
		console.error(error);
	}
};