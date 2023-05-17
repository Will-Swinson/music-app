import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-player";

const size = {
  width: "100%",
  height: 300,
};

const view = "coverart"; // or 'coverart'

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      uri={trackUri ? `${trackUri}` : ``}
      size={size}
      view={view}
      theme="black"
      play={play}
      playerOptions={{
        name: "My Spotify Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        autoConnect: true,
      }}
    />
  );
}
