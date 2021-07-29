const express = require('express')
// import yt-search
const yts = require( 'yt-search' )


const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send(`Where's My PlaylistID? 😠`)
})

// create a route which accepts youtube playlist link as a parameter
app.get('/:playlisId', async function (req, res) {
  let playlistId = req.params.playlisId;
  try {
  const Data = await yts( { listId: playlistId } );
  
  // console.log(Data)
  // for video in videos
  let resVideos = [];
  for (let video of Data.videos) { 
    // make a json object of video title, videoid thumbnail, duration, and link
    let videoId = video.videoId;
    let videoUrl = `https://www.youtube.com/watch?v=${videoId}` 
    let videoObject = {
      title: video.title,
      videoId: videoId,
      videoUrl: videoUrl,
      thumbnail: video.thumbnail,
      duration: video.duration,
      link: video.link
      }
      // add the video object to the array
    resVideos.push(videoObject);
  }
res.send(resVideos);
}
  catch(err){
    res.send("Error Occured. I was expecting a playlist Id! IDK what you sent")
  }
}
)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
