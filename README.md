# grooveimport
Import TXT playlists exported from Grooveshark (yes, back then!) to your Youtube account.

## usage

First, create your playlist on Youtube and find its full playlistId **via an api call using the "list (my playlists)" demo request [on this page](https://developers.google.com/youtube/v3/docs/playlists/list?apix=true&apix_params=%7B%22part%22%3A%22snippet%2CcontentDetails%22%2C%22maxResults%22%3A25%2C%22mine%22%3Atrue%7D).**

Add this id to `app.js` in the parameters of the call to `addVideoToPlaylist(...)` function.

Finally, run:
```bash
node app.js <my-playlist.txt>
```

**Important:** You will be able to import maximum ~ 60 songs per day because of API call quotas... choose them well and be patient! ;)

## input file format

- one track per line,
- ordered
- artist, then ' - ', then title.
