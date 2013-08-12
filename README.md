# DarAudio

jQuery plugin for an HTML5 audio player with playlists.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/darrenmce/dar-audio/master/dist/daraudio.min.js
[max]: https://raw.github.com/darrenmce/dar-audio/master/dist/daraudio.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/daraudio.min.js"></script>
<script>
jQuery(function($) {
    $('#yourDiv').daraudio({
        defaultVolume: 0.5
        , playlistDef : [
            {
                name: "playlist1"
                , folder: "path\to\audio\root"
                , playList: "playlists\playlist1.json"
            }
            ,
            {
                name: "playlist2"
                , folder: "path\to\audio\root"
                , playList: [
                    {
                        Title: "Artist One - Song One"
                        , url: "song1.mp3"
                        , type: "audio/mpeg"
                    }
                    ,
                    {
                        Title: "Artist One - Song Two"
                        , url: "song2.mp3"
                        , type: "audio/mpeg"
                    }
                ]
            }
        ]
    });
</script>
```

## Documentation

###Playlists:

<b>option:</b> playlistDef


+   name:
        The name of the playlist to be displayed in the dropdown.

+   folder:
        The audio root folder, this will be the context for the relative paths in the playlist.

+   playList:
        Either a string with the location of the .json file containing the playList data, or the actual array.
        ex.
            ```playList: "playlists\playlist1.json"```
        OR
            ```playList: [{...}, {...}, ...]```

    <b>option:</b> playList (array format)

    each playlist object(song) should have the following 3 key/values:

    +   Title:
            The name of the track to be displayed.
    +   url:
            The relative path for the audio file (based on the folder defined above)
    +   type:
            The file type of the audio file. ("audio/mpeg", "audio/wav", "audio/oggl; codecs=\"vorbis\""..)


## Examples
[Simple Example][darmce]

[darmce]: http://www.darmce.com/sites/dar-audio/examples/example.html

## Release History
0.1.0 - Initial release

0.2.0 - Added HTML templating (Jade)
