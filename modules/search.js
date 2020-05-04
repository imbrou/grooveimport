var { google } = require('googleapis') ;

/**
 * Lists the search results for a given query.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getResults(auth, query = "claude vonstroke make a cake") {
	var service = google.youtube('v3') ;
	service.search.list({
		auth: auth,
		part: "snippet",
		maxResults: 5,
		q: query
	}, function(err, response) {
		if (err) {
			console.log('The API returned an error: ' + err) ;
			return ;
		}
		console.log(response.data.items)  ;
	}) ;
}

exports.getResults = getResults ;
