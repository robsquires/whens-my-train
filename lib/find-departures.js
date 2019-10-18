function filterDeparturesTo(crs) {
	return service => {
		const [ location = { crs: ''} ] = service.destination.location
		return location.crs === crs.toUpperCase()
	}
}

function getTimeUntilDeparture ({ std, etd }) {
	const delayed = etd !== 'On time'
	const timeOfDeparture = delayed ? etd : std
	const [ hour, mins ] = timeOfDeparture.split(':')
	const ts = new Date()
	ts.setHours(parseInt(hour), parseInt(mins), 0)
	return ts
}

function timeInSeconds(ts) {
	return parseInt(ts.getTime() / 1000)
}

function addTimeUntilDeparture(now = new Date()) {
	const tsNow = timeInSeconds(now)
	return (departure) => {
		const ts = getTimeUntilDeparture(departure)
		return {
			...departure,
			departsIn: timeInSeconds(ts) - tsNow
		}
	}
}

function nextDeparture () {
	return ({ departsIn }) => {
		return departsIn > 0
	}
}


module.exports = function findNextDeparture(departures, destination) {
	const filteredDepartures = departures.filter(filterDeparturesTo(destination))
	console.log('departures for destination', filteredDepartures.length)
	return filteredDepartures
		.map(addTimeUntilDeparture())
		.find(nextDeparture())
}