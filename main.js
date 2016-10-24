//static global vars
var ALBUM_URL = "https://musicbrainz.org/ws/2/release/3611e54a-1a2a-4fdf-af78-287b845e5ebb?inc=aliases%2Bartist-credits%2Bdiscids%2Blabels%2Brecordings";
var COVER_ART = "";

//on load
$.get(ALBUM_URL, function(data) {
  parseAlbumXml($(data));
});

function parseAlbumXml(dataXml){
  //album data
  var artist = dataXml.find("release>artist-credit name"),
    album = dataXml.find("release>title"),
    releaseDate = dataXml.find("release release-event>date"),
    label = dataXml.find("release label>name");

  var date = new Date(releaseDate.text()),
    dateOptions = {year: "numeric", month: "short", day: "numeric"};

  //display album data
  var albumInfoDiv = $("#album-info");
  albumInfoDiv.append("<div>" + artist.text() + "</div>")
    .append("<div>" + album.text() + "</div>")
    .append("<div>" + date.toLocaleDateString("en-US", dateOptions) + "</div>")
    .append("<div>" + label.text() + "</div>");

  //track list
  var tracksArray = dataXml.find("track-list track");

  var trackListDiv = $("#track-list tbody");
  for (var ii=0; ii<tracksArray.length; ii++) {
    var track = $(tracksArray[ii]);

    var position = track.find("track>position"),
      title = track.find("track>recording>title"),
      artist = track.find("track>recording>artist-credit name"),
      duration = track.find("track>length");

    var min = (duration.text()/1000/60) << 0,
      sec = (duration.text()/1000) % 60 << 0;

    //display each track
    trackListDiv.append("<tr>")
      .append("<td>" + position.text() + "</td>")
      .append("<td>" + title.text() + "</td>")
      .append("<td>" + artist.text() + "</td>")
      .append("<td>" + min + ':' + sec + "</td>")
      .append("</tr>");
  }
}