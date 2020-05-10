var { google } = require('googleapis') ;

/**
 * Creates a playlist.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function createPlaylist(auth, title = "Grooveimport", description = "Bruce Deluxe's Grooveimport created this playlist") {
	var service = google.youtube('v3') ;
	return service.playlists.insert({
		auth: auth,
		part: "snippet,status",
		resource: {
			snippet: {
				title: title,
				description: description,
				defaultLanguage: "en"
			},
			status: {
				privacyStatus: "private"
			}
		}
	}) ;
}

/**
 * Adds a video to a playlist.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function addVideoToPlaylist(auth, videoId = "M7FIvfx5J10", playlistId = "PLTdo65j6ZQAWnGNsp4XZ7tCG5hpn"/*-RA7P"*/, position = 0) {
	var service = google.youtube('v3') ;
	return service.playlistItems.insert({
		auth: auth,
		part: "snippet",
		resource: {
			snippet: {
				playlistId: playlistId,
				position: position,
				resourceId: {
					kind: "youtube#video",
					videoId: videoId
				}
			}
		}
	}) ;
}

exports.createPlaylist = createPlaylist ;
exports.addVideoToPlaylist = addVideoToPlaylist ;
