var { google } = require('googleapis') ;

/**
 * Returns the first result for a given query.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function firstResultFor (auth, query = "claude vonstroke make a cake") {
	return firstResultsFor(auth, query, 1) ;
}

/**
 * Returns the search results for a given query.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function firstResultsFor (auth, query = "claude vonstroke make a cake", count = 1) {
	var service = google.youtube('v3') ;
	return new Promise( function (resolve, reject) {
		service.search.list({
			auth: auth,
			part: "snippet",
			maxResults: count,
			q: query
		}, function(err, response) {
			if (err) {
				reject('The API returned an error: ' + err) ;
				return ;
			}
			var results = response.data.items ;
			resolve(count === 1 ? results[0] : results)  ;
		}) ;
	}) ;
}

exports.firstResultFor = firstResultFor ;
exports.firstResultsFor = firstResultsFor  ;
