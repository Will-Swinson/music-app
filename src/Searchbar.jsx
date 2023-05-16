import React, { useState, useEffect } from "react";
import useAuth from "./useAuth.jsx";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult.jsx";
import Player from "./Player.jsx";

const spotifyApi = new SpotifyWebApi({
  clientId: "6149eda588f347a0856c12deaaff09a3",
});

export default function Searchbar({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  function selectedTrack(track) {
    let selectedTrack = track;
    return selectedTrack;
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (!accessToken) return;
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(searchResults);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <>
      <div className="flex ml-96 mt-6">
        <form
          onSubmit={handleSearchSubmit}
          className="w-64 h-8 flex  justify-center bg-white"
        >
          <input
            className="pl-2 pr-2 w-full"
            type="search"
            placeholder="Search songs,artists, albums..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="grid grid-cols-5 mt-6 mb-8">
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
              selectedTrack={selectedTrack}
            />
          );
        })}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </>
  );
}
