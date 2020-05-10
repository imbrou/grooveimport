var { authenticate } = require('./modules/auth.js') ;
var { firstResultFor, firstResultsFor } = require('./modules/search.js') ;
var { createPlaylist, addVideoToPlaylist } = require('./modules/playlist.js') ;
var { loadPlaylist } = require('./modules/txt.js') ;

/**
 * Prints usage.
 */
var printUsage = function printUsage () {
	console.log("\nUsage:\n\tnode app.js <playlist.txt>\n") ;
}

if ( process.argv.length < 3) {
	printUsage() ;
	return 1 ;
}

console.log(">>> Authenticating...") ;
var promise = authenticate() ;

promise.then( async function (auth) {
	console.log(">>> Loading playlist...") ;
	var playlist = loadPlaylist(process.argv[2]) ;
	console.log('>>> Tracks loaded: '+playlist.length) ;

	console.log('>>> Fetching the first track result for each track...') ;
	var tracks = [], track = "", response = {}, notFound = [] ;
        var queries = playlist.map( function (track) {
		var str = `${track.artist} ${track.name}` ;
		return str.replace(/[^a-zA-Z ]/g, "") ;
	}) ;
	for (let i = 0; i < queries.length; i++) {
		track = await firstResultFor(auth, queries[i]) ;
		if (track) {
			console.log(`found: ${track.id.videoId} / ${track.snippet.title}`) ;
			console.log('>>> Adding to playlist...') ;
			response = await addVideoToPlaylist(
				auth,
				track.id.videoId,
				"PLTdo65j6ZQAWnGNsp4XZ7tCG5hpn-RA7P",
				i
			) ;
			console.log(`Response: ${response.status} ${response.statusText}`) ;

			if ( response.status === 200 )
				tracks.push(track.id.videoId) ;
			else
				notFound.push(queries[i]) ;
		} else {
			console.log('not found: '+queries[i]) ;
			notFound.push(queries[i]) ;
		}
	}
	console.log('>>> Tracks found: ${tracks.length} (not found: ${notFound.length})') ;
}) ;

return 0 ;
