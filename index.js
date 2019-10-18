const getDepartureBoard = require('./lib/get-departure-board');
const findNextDeparture = require('./lib/find-departures');

function readTime(timeInSeconds) {
	const mins = parseInt(timeInSeconds / 60);
	const seconds = parseInt((timeInSeconds % 60)) * 60;

	return mins > 0
		? `${mins} minute${mins > 1 ? 's' : ''}`
		: `${seconds} seconds`
}

async function go () {
	const departures = await getDepartureBoard('FOH')
	const { departsIn } = findNextDeparture(departures, 'LBG') || { departsIn: 0 }
	console.log(readTime(departsIn))
}

go();
