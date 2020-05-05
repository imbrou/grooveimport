var fs = require('fs') ;

/**
 * Loads tracks of a playlist from a TXT file.
 * Tracks must be newline-separated.
 * On a line, the artist must come first, then the ' - ' separator, then the title.
 * 
 * @param filename {String} path to the file to open
 * @return {String} playlist
 */
var loadPlaylist = function loadPlaylist (filename) {
	let file = fs.readFileSync(filename, {encoding: 'utf-8'}) ;
	var playlist = file.split('\n')
		.filter( entry => /\S/.test(entry) ) // remove white lines
		.map( (line, index) => Object({
			index: index,
			artist: line.split(' - ').shift().trim(),
			name: line.split(' - ').pop().trim()
		})) ;
	return playlist ;
}

exports.loadPlaylist = loadPlaylist ;
