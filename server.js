const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/refresh', (req,res) =>{
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri:process.env.REDIRECT_URI,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken,

    })
})

app.post('/', (req,res) =>{
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri:process.env.REDIRECT_URI,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        
    });

    // line 13 we are authorizing that we have a code;
    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            // Once we have this code it will give us the access_token, refresh_token and expires_in token and those are used to authenticate the user;
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });
    }).catch((e)=>{
        // any issue it will catch it here and send status of 400;
        // console.log(e);
        res.sendStatus(400);
    })
});

app.listen(3001);