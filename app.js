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
	var tracks = [], track = "" ;
        var queries = playlist.map( function (track) {
		var str = `${track.artist} ${track.name}` ;
		return str.replace(/[^a-zA-Z ]/g, "") ;
	}) ;
	for (let i = 0; i < queries.length; i++) {
		track = await firstResultFor(auth, queries[i]) ;
		if (track) {
			console.log('found: '+JSON.stringify(track,null,2)) ;
			tracks.push(track.id.videoId) ;
		} else {
			console.log('not found: '+queries[i]) ;
		}
	}
	console.log('>>> Tracks found: '+tracks.length) ;
}) ;

return 0 ;
