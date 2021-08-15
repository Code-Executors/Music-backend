'use strict';

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
// const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
console.log('hi');
app.post('/refresh', (req,res) =>{
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000' ,
    clientId:'e1fe8085e345416ea70a5881724413af',
    clientSecret:'b74d44dfe2a342b6b702722fbfadc175',
    refreshToken,
  });

  spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body.accessToken,
      expiresIn: data.body.expiresIn
    });
    console.log(data.body);
  })
    .catch(e => {
      console.log(e);
      res.sendStatus(400);
    });
});

app.post('/login', (req,res) =>{
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri:'http://localhost:3000' ,
    clientId:'e1fe8085e345416ea70a5881724413af',
    clientSecret:'b74d44dfe2a342b6b702722fbfadc175',
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

app.listen(3001);
