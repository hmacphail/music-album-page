//static global vars
var ALBUM_URL = "https://musicbrainz.org/ws/2/release/3611e54a-1a2a-4fdf-af78-287b845e5ebb?inc=aliases%2Bartist-credits%2Bdiscids%2Blabels%2Brecordings";
var COVER_ART = "Eureka.jpg";

//on load
$.get(ALBUM_URL, function(data) {
  parseAlbumXml($(data));
});

$("#album-cover").append("<img src='" + COVER_ART + "'>")

function parseAlbumXml(dataXml){
  //album data
  var album = dataXml.find("release>title").text(),
    artist = dataXml.find("release>artist-credit name").text(),
    releaseDate = dataXml.find("release release-event>date").text(),
    label = dataXml.find("release label>name").text();

  var date = new Date(releaseDate),
    dateOptions = {year: "numeric", month: "short", day: "numeric"};

  //display album data
  var albumInfoDiv = $("#album-info");
  albumInfoDiv.append("<div id='album-name'>" + album + "</div>")
    .append("<div id='album-artist'>" + artist + "</div>")
    .append("<div id='release-date'>" + date.toLocaleDateString("en-US", dateOptions) + "</div>")
    .append("<div id='record-label'>" + label + "</div>");

  //track list
  var tracksArray = dataXml.find("track-list track");
  for (var ii=0; ii<tracksArray.length; ii++) {
    var track = $(tracksArray[ii]);

    var position = track.find("track>position").text(),
      title = track.find("track>recording>title").text(),
      artist = track.find("track>recording>artist-credit name").text(),
      duration = track.find("track>length").text();

    var min = (duration/1000/60) << 0,
      sec = (duration/1000) % 60 << 0;

    //display each track
    var trackRow = "<tr>"
      + "<td class='position'>" + position + "</td>"
      + "<td>" + title + "</td>"
      + "<td>" + artist + "</td>"
      + "<td class='duration'>" + min + ":" + sec + "</td>"
      + "</tr>";
    $("#track-list tbody").append(trackRow);
  }
}