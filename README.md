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
   $('#yourDiv').daraudio(
     {
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
_(Coming soon)_

## Examples
[Simple Example][darmce]

[darmce]: http://www.darmce.com/sites/dar-audio/examples/example.html

## Release History
_(Nothing yet)_
