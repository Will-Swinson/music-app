import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "269f72af8ff1461f967173ee0505ef74",
      clientSecret: "6e4d3b759f774feea6728885f382ab61",
      refreshToken: refreshToken,
    });

    const data = await spotifyApi.refreshAccessToken();

    res.json({
      accessToken: data.body.accessToken,
      expressIn: data.body.expiresIn,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  try {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "269f72af8ff1461f967173ee0505ef74",
      clientSecret: "6e4d3b759f774feea6728885f382ab61",
    });

    const data = await spotifyApi.authorizationCodeGrant(code);

    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
