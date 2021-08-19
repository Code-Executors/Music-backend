'use strict';

const express = require('express');
const mongoose = require('mongoose');
const SpotifyWebApi = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder');
const {getSongs,createSong,deleteSong} = require('./controller/Songs.controller');
const {seedFunction} = require('./module/Schema.module');
mongoose.connect('mongodb://localhost:27017/songs',{useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// seedFunction();

app.post('/refresh', (req,res) =>{
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:process.env.REDIRECT_URI ,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in
    });
  })
    .catch(e => {
      console.log(e);
      res.sendStatus(400);
    });
});

app.post('/login', (req,res) =>{
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:process.env.REDIRECT_URI ,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
  });

  // line 13 we are authorizing that we have a code;
  spotifyApi.authorizationCodeGrant(code).then(data=>{
    res.json({
      // Once we have this code it will give us the access_token, refresh_token and expires_in token and those are used to authenticate the user;
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  }).catch((e)=>{
    // any issue it will catch it here and send status of 400;
    console.log(e);
    res.sendStatus(400);
  });
});

app.get('/lyrics', async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || 'No Lyrics Found';
  res.json({ lyrics });
});
app.get('/song',getSongs);
app.post('/songs',createSong);
app.delete('/songs/:id', deleteSong);

app.listen(3001);
