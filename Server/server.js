import app from "./Middleware/middleware.js";
import SpotifyWebApi from "spotify-web-api-node";

import postgres from "postgres";

const port = 3001;

export const sql = postgres(
  "postgres://willswinson:Swinson1!@127.0.0.1:5432/music_db"
);

app.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "6149eda588f347a0856c12deaaff09a3",
      clientSecret: "d32b43b33b194b2db6606227e2fbd223",
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
    console.log(req.body);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: "http://localhost:3000",
      clientId: "6149eda588f347a0856c12deaaff09a3",
      clientSecret: "d32b43b33b194b2db6606227e2fbd223",
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
