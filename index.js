const express = require('express')
// import yt-search
const yts = require( 'yt-search' )


const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('This is not the correct route buddy!')
})

// create a route which accepts youtube playlist link as a parameter
app.get('/:playlisId', async function (req, res) {
  let playlistId = req.params.playlisId;
  try {
  const Data = await yts( { listId: playlistId } );
  
  res.send(Data)
  }
  catch{
    res.send("Send the Playlist Id Buddy!")
  }
}
)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
