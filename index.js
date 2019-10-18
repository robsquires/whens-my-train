const getDepartureBoard = require('./lib/get-departure-board');
const findNextDeparture = require('./lib/find-departures');

function readTime(timeInSeconds) {
	const mins = parseInt(timeInSeconds / 60);
	const seconds = parseInt((timeInSeconds % 60)) * 60;

	return mins > 0
		? `${mins} minute${mins > 1 ? 's' : ''}`
		: `${seconds} seconds`
}


const express = require('express')
const app = express();
 
app.get('/:from/:to', function (req, res) {
	const { from, to } = req.params;
	console.log('params ', from, to)
	
	getDepartureBoard(from).then(departures => {
		console.log('found departures', departures.length)
		
		const departure = findNextDeparture(departures, to);
		if (!departure) {
			return res.json('Please check destination');
		}

		res.send(readTime(departure.departsIn))
	}).catch(err => {
		console.error(err);
		res.json('Please check station');
	});
})
 
app.listen(3000)
