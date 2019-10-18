const soap = require('soap')
const url = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2017-10-01'

async function getClient () {
	const client = await soap.createClientAsync(url)
	client.addSoapHeader({
		'tok:AccessToken': {
			'tok:TokenValue': 'b8fa41f1-d26b-4ee4-817b-ddc7137ad452'
		}
	})
	return client
}

module.exports = async function getDepartureBoard(crs) {
	const client = await getClient()
	const [result] = await client.GetDepartureBoardAsync({
		numRows: 50,
		crs: crs.toUpperCase(),
	});
	console.log(result);
	return result.GetStationBoardResult.trainServices.service
}